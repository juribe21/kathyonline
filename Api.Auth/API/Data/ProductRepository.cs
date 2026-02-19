using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ProductRepository(AppDbContext context) : IProductRepository
    {

        public async Task<IReadOnlyList<Product>> GetProductsAsync(string cat)
        {
            if (cat == "a")
            {
                return await context.Products.ToListAsync();
            }
            else
            {
                if(cat == "e")
                {
                    cat = "enfermeria";
                    return await context.Products.Where(x => x.CategoriaId == cat).ToListAsync();
                }
                else
                {
                    cat = "joyeria";
                    return await context.Products.Where(x => x.CategoriaId == cat).ToListAsync();
                }
            }            
        }

        public async Task<Product?> GetProductByIdAsync(string id)
        {
            return await context.Products.FindAsync(id);
        }        

        public async Task<Product?> GetSelectedProductForUpdate(string id)
        {
            throw new NotImplementedException();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await context.SaveChangesAsync() > 0;
        }

       
        public async Task<IReadOnlyList<ProductPicture>> GetPreviosPurchasedProducts(string id)
        {
            return await context.Products
                .Where(x => x.Id == id)
                .SelectMany(x => x.ProductPictures)
                .ToListAsync();
        }
    }
}
