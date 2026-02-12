using API.Entities;

namespace API.Interfaces
{
    public interface IProductRepository
    {
        Task<IReadOnlyList<Product>> GetProductsAsync(string cat);
        Task<Product?> GetProductByIdAsync(string id);
        Task<Product?> GetSelectedProductForUpdate(string id);

        //void Update(Pedido pedido);
        Task<bool> SaveAllAsync();
    }
}
