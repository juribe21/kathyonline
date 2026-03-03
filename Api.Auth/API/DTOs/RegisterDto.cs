using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Name { get; set; } = string.Empty; // username

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        public int UserTypeId { get; set; } = 1;

        [Required]
        [MinLength(5)]
        public string Password { get; set; } = string.Empty;


        [Required]        
        public string Nombre { get; set; } = string.Empty;
        [Required]
        public string LastName { get; set; } = string.Empty;
        [Required]
        public string Telefono { get; set; } = string.Empty;
        [Required]
        public string Gender { get; set; } = string.Empty;
        
        public string DateOfBirth { get; set; } = string.Empty;
        [Required]
        public string Description { get; set; } = string.Empty;
    }
}
