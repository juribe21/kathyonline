using System;

namespace API.Entities;

public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; } // username
    public required string Email { get; set; }
    public string? ImageUrl{ get; set; } // for nav bar
    public required int UserTypeId { get; set; }
    public required byte[] PasswordHash { get; set; }
    public required byte[] PasswordSalt { get; set; }


    // Navigation Propperties
    public Client Client { get; set; } = null!;
    
}
