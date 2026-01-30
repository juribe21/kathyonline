using API.DTOs;
using API.Entities;
using API.Interfaces;

namespace API.Extesnions
{
    public static class AppUserExtensios
    {
        public static UserDto ToDto(this AppUser user, ITokenService tokenService)
        {
            return new UserDto
            {
                Id = user.Id,
                Name = user.Name,
                Email = user.Email,
                //ImageUrl = user.ImageUrl,
                Token = tokenService.CreateToken(user),
            };
        }
    }
}
