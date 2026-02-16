using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task<IReadOnlyList<Product>> GetProductsAsync(string cat);
        Task<Product?> GetProductByIdAsync(string id);
        Task<Product?> GetSelectedProductForUpdate(string id);

        Task<IReadOnlyList<ProductPicture>> GetPreviosPurchasedProducts(string id);

        //void Update(Pedido pedido);
        Task<bool> SaveAllAsync();
    }
}
