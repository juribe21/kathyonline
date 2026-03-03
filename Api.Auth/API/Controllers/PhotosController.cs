using API.Data;
using API.Entities;
using API.Extesnions;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class PhotosController(IPhotoService photoService) : BaseApiController
    {
        [HttpPost("add-photo")]
        public async Task<ActionResult<Photo>> AddPhoto([FromForm] IFormFile file)
        {
            var member = await photoService.GetClientForUpdate(User.GetClientId());
            if (member == null) return BadRequest("Cannot update member");

            var result = await photoService.UploadPhotoAsync(file);
            if (result.Error != null) return BadRequest(result.Error.Message);

            var photo = new Photo
            {
                Url = result.SecureUrl.AbsoluteUri,
                PublicId = result.PublicId,
                ClientId = User.GetClientId()
            };

            if (member.ImageUrl == null)
            {
                member.ImageUrl = photo.Url;
                member.User.ImageUrl = photo.Url;
            }

            member.Photos.Add(photo);

            if (await photoService.SaveAllAsync())
            {
                return photo;
            }

            return BadRequest("Problem adding photo");
        }

        [HttpPut("set-main-photo/{photoId}")]
        public async Task<ActionResult> SetMainPhoto(int photoId)
        {
            var client = await photoService.GetClientForUpdate(User.GetClientId());
            if (client == null) return BadRequest("Cannot get client from token");
            var photo = client.Photos.SingleOrDefault(p => p.Id == photoId);

            if (client.ImageUrl == photo?.Url || photo == null)
            {
                return BadRequest("Cannot set this as main image");
            }

            client.ImageUrl = photo.Url;
            client.User.ImageUrl = photo.Url;

            if (await photoService.SaveAllAsync()) return NoContent();
            return BadRequest("Problem setting main photo");
        }

        [HttpDelete("delete-photo/{photoId}")]
        public async Task<ActionResult> DeletePhoto(int photoId)
        {
            var cliente = await photoService.GetClientForUpdate(User.GetClientId());
            if (cliente == null) return BadRequest("Cannot get client from token");
            var photo = cliente.Photos.SingleOrDefault(p => p.Id == photoId);

            if (photo == null || photo?.Url == cliente.ImageUrl)
            {
                return BadRequest("This photo cannot be deleted");
            }

            if (photo?.PublicId != null)
            {
                var result = await photoService.DeletePhotoAsync(photo.PublicId);
                if (result.Error != null)
                {
                    return BadRequest(result.Error.Message);
                }
            }

            cliente.Photos.Remove(photo);

            if (await photoService.SaveAllAsync()) 
                return NoContent();
            return BadRequest("Problem deleting photo");
        }

        [HttpGet("{id}/photo")]
        public async Task<ActionResult<Photo>> GetClientFoto(string id)
        {
            return Ok(await photoService.GetClientFoto(id));
        }

        [HttpGet("{id}/photos")]
        public async Task<ActionResult<IReadOnlyList<Photo>>> GetClientFotos(string id)
        {
            return Ok(await photoService.GetClientFotos(id));
        }
    }
}