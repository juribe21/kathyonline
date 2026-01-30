using System;

namespace API.Entities;

public class AppUser
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; } // username
    public required string Email { get; set; }
    public required string Password { get; set; }
    public required int UserTypeId { get; set; }
}
