
namespace API.Entities;

public class Client
{
    public required string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Email { get; set; }
    public required string Telefono { get; set; }
    public required int SexId { get; set; }
}
