using API.Entities;
using CloudinaryDotNet.Actions;

namespace API.Interfaces
{
    public interface IPhotoService
    {
        Task<Client?> GetClientForUpdate(string id);
        Task<ImageUploadResult> UploadPhotoAsync(IFormFile file);
        Task<DeletionResult> DeletePhotoAsync(string publicId);
        Task<bool> SaveAllAsync();
        Task<Photo> GetClientFoto(string id);
    }
}