using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class SeedProduct
{
    public static async Task SeedProducts(AppDbContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var prodcutsdata = await File.ReadAllTextAsync("Data/Productos.json");
        var products = JsonSerializer.Deserialize<List<SeedProductDto>>(prodcutsdata);

        if (products == null)
        {
            Console.WriteLine("No products to seed in data JsonFile");
            return;
        }

        foreach (var p in products)
        {
            var prod = new Product
            {
                Id = p.Id,
                ProductName = p.ProductName,
                ProductImageUrl = p.ProductImageUrl,
                Description = p.Description,
                Precio = p.Precio,
                Cantidad = p.Cantidad,
                CategoriaId = p.CategoriaId
            };

            context.Products.Add(prod);
        }

        await context.SaveChangesAsync();
    }
}
