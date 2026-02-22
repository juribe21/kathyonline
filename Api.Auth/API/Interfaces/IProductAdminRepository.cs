using API.DTOs;
using API.Entities;
using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IProductAdminRepository
    {
        Task<bool> ValidarExisteProducto(string productId);
        Task<Product> AddProduct (ProductDto productDto);
        void UpdateProduct (ProductDto productDto);
        Task<bool> DeleteProduct (string id);
        Task<ProductPicture> AddNewProductPicture(IFormFile file, string id);
        Task<IReadOnlyList<ProductPicture>> GetPhotosProductById (string Id);


        Task<ImageUploadResult> UploadPhotoAsync(IFormFile file, string id);
        Task<DeletionResult> DeletePhotoAsync(string productId);
        Task<DeletionResult> DeletePhotoByIdAsync(string publicId);

        Task<bool> ValidateUserAdministrator(string userId);


        Task<bool> SaveAllAsync();
    }
}
