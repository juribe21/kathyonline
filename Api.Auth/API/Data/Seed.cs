using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task Seedusers(AppDbContext context)
    {
        if (await context.Users.AnyAsync()) return;

        var memberData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var clients = JsonSerializer.Deserialize<List<SeedUserDto>>(memberData);

        if (clients == null)
        {
            Console.WriteLine("No members in seed data");
            return;
        }

        foreach (var client in clients)
        {
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                Id = client.Id,
                Email = client.Email,
                Name = client.Name,
                ImageUrl = client.ImageUrl,
                UserTypeId = 1,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("password")),
                PasswordSalt = hmac.Key,
                Client = new Client
                {
                    Id = client.Id,
                    Name = client.Name,
                    LastName = client.LastName,
                    Email = client.Email,
                    Telefono = client.Telefono,
                    Description = client.Description,
                    DateOfBirth = client.DateOfBirth,
                    ImageUrl = client.ImageUrl,
                    Gender = client.Gender,
                    City = client.City,
                    Country = client.Country,
                    LastActive = client.LastActive,
                    Created = client.Created
                }
            };

            user.Client.Photos.Add(new Photo
            {
                Url = client.ImageUrl!,
                ClientId = client.Id
            });

            context.AppUsers.Add(user);
        }

        await context.SaveChangesAsync();
    }
}
