using API.Data;
using API.DTOs;
using API.Entities;
using API.Extesnions;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class ClientsController(IClientRepository clientRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetUsers()
        {
            try
            {
                var users = await clientRepository.GetClientsAsync();
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await clientRepository.GetClientByIdAsync(id);

            if (user != null)
            {
                return Ok(user);
            }
            else
            {
                return NotFound();
            }
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetClientPhotos(string id)
        {
            return Ok(await clientRepository.GetPhotosFromClientsAsync(id));
        }

        [HttpGet("getProducts/{id}")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string id)
        {
            return Ok(await clientRepository.GetProductsFromClientsAsync(id));
        }

        [HttpPut]
        public async Task<ActionResult> UpdateMember(ClientUpdateDto clientUpdateDto)
        {
            string clientId = string.Empty;
            if (!clientUpdateDto.IsAdmin)
            {
                var clientSessionId = User.GetMemberId();                
                if (clientId == null) return BadRequest("No Id found in token");
                clientId = clientSessionId;
            }
            else
            {
                clientId = clientUpdateDto.ClientIdToUpdate;
            }
            

            var client = await clientRepository.GetClientForUpdate(clientId);
            if (client == null) return BadRequest("Could no get member");

            client.Name = clientUpdateDto.Name ?? client.Name;
            client.LastName = clientUpdateDto.LastName ?? client.LastName;
            client.Telefono = clientUpdateDto.Telefono ?? client.Telefono;
            client.Email = clientUpdateDto.Email ?? client.Email;
            client.Description = clientUpdateDto.Description ?? client.Description;

            // Update name en Entidad AppUser
            client.User.Name = clientUpdateDto.Name ?? client.User.Name;

            //memberRepository.Update(member);

            if (await clientRepository.SaveAllAsync()) return NoContent();
            return BadRequest("Failed to update member");
        }

        //[HttpPut("updateMemberAsAdministrator")]
        //public async Task<ActionResult> UpdateMemberAsAdministrator(ClientUpdateDto clientUpdateDto)
        //{
        //    var client = await clientRepository.GetClientForUpdate(clientUpdateDto.ClientIdToUpdate);
        //    return Ok();
        //}

    }
}
