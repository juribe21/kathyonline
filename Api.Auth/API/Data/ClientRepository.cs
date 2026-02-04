using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class ClientRepository(AppDbContext context) : IClientRepository
{    

    public async Task<Client?> GetClientByIdAsync(string id)
    {
        return await context.Clients.FindAsync(id);
    }

     public async Task<IReadOnlyList<Client>> GetClientsAsync()
    {
        return await context.Clients
            .ToListAsync();
    }

    public async Task<Client?> GetClientForUpdate(string id)
    {
        return await context.Clients
        .Include(x => x.User)
        .Include(x => x.Photos)
        .SingleOrDefaultAsync(x => x.Id == id);
    }   

    public async Task<IReadOnlyList<Photo>> GetPhotosFromClientsAsync(string clientId)
    {
        return await context.Clients
        .Where(x => x.Id == clientId)
        .SelectMany(x => x.Photos)
        .ToListAsync();
    }

    public void Update(Client client)
    {
        context.Entry(client).State = EntityState.Modified;
    }   

    public async Task<IReadOnlyList<Product>> GetProductsFromClientsAsync(string id)
    {
        return await context.Products.ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }    

}
