namespace API.DTOs
{
    public class SeedUserDto
    {
        public required string Id { get; set; }
        public required string Name { get; set; }
        public required string LastName { get; set; }    
        public required string Email { get; set; }
        public required string Telefono { get; set; }
        public required int Gender { get; set; }
        public DateOnly DateOfBirth { get; set; }
        public DateTime Created { get; set; }
        public DateTime LastActive { get; set; }
        public string? Description { get; set; }
        public required string City { get; set; }
        public required string Country { get; set; }
        public string? ImageUrl { get; set; }        
        
    }
}
