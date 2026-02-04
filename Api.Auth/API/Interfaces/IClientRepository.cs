using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;

namespace API.Interfaces
{
    public interface IClientRepository
    {
        void Update(Client client);
        Task<bool> SaveAllAsync();
        Task<IReadOnlyList<Client>> GetClientsAsync();
        Task<Client?> GetClientByIdAsync(string id);
        Task<Client?> GetClientForUpdate(string id);
        Task<IReadOnlyList<Photo>> GetPhotosFromClientsAsync(string id);
        Task<IReadOnlyList<Product>> GetProductsFromClientsAsync(string id);
    }
}