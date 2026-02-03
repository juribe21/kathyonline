using API.Data;
using API.DTOs;
using API.Entities;
using API.Extesnions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Win32;
using System.Security.Cryptography;
using System.Text;

namespace API.Controllers
{
    public class AccountController(AppDbContext context, ITokenService tokenService) : BaseApiController
    {
        [HttpPost("register")]
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            if (await EmailExist(registerDto.Email))
            {
                return BadRequest("Email taken");
            }

            using var hmac = new HMACSHA512();
            
            var appUser = new AppUser
            {
                Name = registerDto.Name,
                Email = registerDto.Email,
                UserTypeId = registerDto.UserTypeId,
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)),
                PasswordSalt = hmac.Key
            };

            context.AppUsers.Add(appUser);
            await context.SaveChangesAsync();
            
            return appUser.ToDto(tokenService);            
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> login(LoginDto login)
        {
            // TO DO: 
            // Enviar un flag que indique si es (Usuario) Admin = true  y Cliente = false 
            // para acceder a la administracion - Revisar UserDto y User properties

            var appUser = await context.AppUsers.SingleOrDefaultAsync(x => x.Email == login.Email);
            if (appUser == null) return Unauthorized("Invalid credentials");

            using var hmac = new HMACSHA512(appUser.PasswordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != appUser.PasswordHash[i])
                {
                    return Unauthorized("Invalid credentials");
                }
            }

            return appUser.ToDto(tokenService);
        }

        private async Task<bool> EmailExist(string email)
        {
            return await context.Users.AnyAsync(x => x.Email.ToLower() == email.ToLower());
        }
    }
}
