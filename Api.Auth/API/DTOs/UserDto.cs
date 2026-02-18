namespace API.DTOs
{
    public class UserDto
    {
        // TO DO: 
            // Enviar un flag que indique si es (Usuario) Admin = true  y Cliente = false 
            // para acceder a la administracion
        public required string Id { get; set; }
        public required string Email { get; set; }
        public required string Name { get; set; }
        public string? ImageUrl { get; set; }
        public required string Token { get; set; }
        public int UserTypeId { get; set; }
    }
}
