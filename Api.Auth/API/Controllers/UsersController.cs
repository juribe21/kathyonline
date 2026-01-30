using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetUsers()
        {
            try
            {
                var users = await context.AppUsers.ToListAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await context.AppUsers.FindAsync(id);

            if(user != null) 
            {
                return Ok(user);
            }
            else
            {
                return NotFound();  
            }
        }
    }
}
