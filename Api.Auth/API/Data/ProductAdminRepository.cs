using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using API.Services;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace API.Data
{
    public class ProductAdminRepository : IProductAdminRepository
    {
        private readonly Cloudinary _cloudinary;
        private readonly AppDbContext context;

        public ProductAdminRepository(IOptions<CloudinarySettings> config, AppDbContext context)
        {
            var account = new Account(
             config.Value.CloudName,
             config.Value.ApiKey,
             config.Value.ApiSecret
         );
            _cloudinary = new Cloudinary(account);
            this.context = context;
        }

        public async Task<bool> ValidarExisteProducto(string productId)
        {
            if(await context.Products.Where(x => x.Id == productId).AnyAsync()) return true;
            return false;
        }

        public async Task<Product> AddProduct(ProductDto productDto)
        {

            if (productDto.CategoriaId == "e")
            {
                productDto.CategoriaId = "enfermeria";                
            }
            else
            {
                productDto.CategoriaId = "joyeria";                
            }

            var producto = new Product()
            {
                Id = Guid.NewGuid().ToString(),
                ProductName = productDto.ProductName,
                ProductImageUrl = productDto.ProductImageUrl,
                Description = productDto.Description,
                Precio = productDto.Precio,
                Cantidad = productDto.Cantidad,
                IsDeleted = productDto.IsDeleted ?? false,
                DateDeleted = productDto.DateDeleted,
                DeletedByUserId = productDto.DeletedByUserId,
                CategoriaId = productDto.CategoriaId
            };

            context.Products.Add(producto);
            return producto;
        }

        public async Task<ProductPicture> AddNewProductPicture(IFormFile file, string id)
        {
            var fotos = context.ProductPictures.ToList();
            ProductPicture pic = null;
            List<ProductPicture> pictureList = new List<ProductPicture>();
            // Before to Add foto Save Foto on Cloudinary
            var result = await UploadPhotoAsync(file, id);

            if (result == null)
            {
                return pic;
            }

            pic = new ProductPicture
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                ProductId = id,
            };
            context.ProductPictures.Add(pic);
            await UpdateFotoProducto(pic.Url, pic.ProductId);
            
            if(await SaveAllAsync()) return pic;

            return pic;
        }

        private async Task UpdateFotoProducto(string imgUrl, string productId)
        {
            var prod = await context.Products.FindAsync(productId);
            if (prod != null)
            {
                prod.ProductImageUrl = imgUrl;
            }
            context.Entry(prod).State = EntityState.Modified;
        }

        public void UpdateProduct(ProductDto productDto)
        {
            var product = context.Products.Where(x => x.Id == productDto.Id).FirstOrDefault();

            if (product == null)
            {
                return;
            }

            // product.Id = Guid.NewGuid().ToString(),
            product.ProductName = productDto.ProductName;
            product.ProductImageUrl = productDto.ProductImageUrl;
            product.Description = productDto.Description;
            product.Precio = productDto.Precio;
            product.Cantidad = productDto.Cantidad;
            product.IsDeleted = productDto.IsDeleted;
            product.DateDeleted = productDto.DateDeleted;
            product.DeletedByUserId = productDto.DeletedByUserId;
            product.CategoriaId = productDto.CategoriaId;
           

            context.Entry(product).State = EntityState.Modified;
            
        }

        public async Task<bool> DeleteProduct(string productId)
        {
            var pics = await GetPhotosProductById(productId);

            if (pics == null) { return false; }

            foreach (var photo in pics)
            {
                // Delete from Coludinary
                await DeletePhotoAsync(photo.PublicId);
            }

            foreach (var photo in pics)
            {
                context.ProductPictures.Remove(photo);
            }

            Product? productToRemove = context.Products.Where(x => x.Id == productId).SingleOrDefault();
            if (productToRemove != null)
            {
                context.Products.Remove(productToRemove);
            }

            if(await SaveAllAsync())
            {
                return true;
            }

            return false;
        }

        public async Task<IReadOnlyList<ProductPicture>> GetPhotosProductById(string productId)
        {
            return await context.ProductPictures
                .Where(x => x.ProductId == productId)
                .ToListAsync();
        }

        public async Task<IReadOnlyList<Product>> GetProducts()
        {
            return await context.Products
                .Include(x => x.ProductPictures)
                .ToListAsync();
                
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

        public async Task<ImageUploadResult> UploadPhotoAsync(IFormFile file, string id)
        {
            var uploadResult = new ImageUploadResult();
            if (file.Length > 0)
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams
                {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(300).Width(300).Crop("fill").Gravity("face"),
                    Folder = "kathy-products"
                };
                uploadResult = await _cloudinary.UploadAsync(uploadParams);
            }
            return uploadResult;
        }

        public async Task<DeletionResult> DeletePhotoAsync(string publicId)
        {
            var photo = context.ProductPictures.SingleOrDefault(p => p.PublicId == publicId);
            if (photo == null) return new DeletionResult();

            var deleteParams = new DeletionParams(photo?.PublicId);
            if (deleteParams != null)
            {
                return await _cloudinary.DestroyAsync(deleteParams);
            }
            else
            {
                return new DeletionResult();
            }
        }

        public async Task<DeletionResult> DeletePhotoByIdAsync(string publicId)
        {
            var deleteresult = new DeletionResult();

            var pic = context.ProductPictures.Where(x => x.PublicId == publicId).SingleOrDefault();
            if (pic == null) return new DeletionResult();
            else
            {                
                var deleteParams = new DeletionParams(publicId);
                if(deleteParams != null)
                {
                    context.ProductPictures.Remove(pic);
                    deleteresult = await _cloudinary.DestroyAsync(deleteParams);
                }

                return deleteresult;
            }
        }

        public async Task<DeletionResult> DeleteProductPhotoByIdAsync(int id)
        {
            var prod = context.ProductPictures.Where(x => x.Id == id).SingleOrDefault();
            if (prod == null || string.IsNullOrEmpty(prod.PublicId)) return new DeletionResult();

            return await DeletePhotoByIdAsync(prod.PublicId);

        }

        public async Task<bool> ValidateUserAdministrator(string userId)
        {
            var user = await context.AppUsers.Where(x => x.Id == userId).SingleAsync();
            if (user == null) return false;

            if (user.UserTypeId == (int)EUserTypes.Admin ) return true; // Admin
            else
            {
                return false;
            }
        }
               
    }
}
