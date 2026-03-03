using API.DTOs;
using API.Entities;
using API.Extesnions;
using API.Interfaces;
using API.Services;
using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ProductsAdminController(IProductAdminRepository productAdminRepository) : BaseApiController
    {

        [HttpGet("{productId}")]
        public async Task<ActionResult<IReadOnlyList<ProductPicture>>> GetFotos(string productId)
        {
            return Ok(await productAdminRepository.GetPhotosProductById(productId));
        }


        [HttpGet] // GetProducts
        public async Task<ActionResult<IReadOnlyList<ProductPicture>>> GetProducts()
        {
            return Ok(await productAdminRepository.GetProducts());
        }


        [HttpPost("add-newproduct")]
        public async Task<ActionResult<Product>> AddNewProduct(ProductDto productDto)
        {
            if (productDto == null)
            {
                return BadRequest();
            }
            if (!await productAdminRepository.ValidateUserAdministrator(User.GetClientId()))
                return BadRequest("Access denied to this user");

            var producto = await productAdminRepository.AddProduct(productDto);
            if (await productAdminRepository.SaveAllAsync())
            {
                return Ok(producto);
            }

            return BadRequest("Problemas para registrar el nuevo producto");
        }


        [HttpPost("add-newproductpicture/{id}")]
        public async Task<ActionResult<ProductPicture>> AddNewProductPicture(IFormFile file, string id)
        {
            if (file.Length <= 0)
            {
                return BadRequest("El archivo no es valido");
            }
            if (!await productAdminRepository.ValidateUserAdministrator(User.GetClientId()))
                return BadRequest("Access denied to this user");

            var imageUpload = await productAdminRepository.AddNewProductPicture(file, id);

            if (imageUpload == null)
            {
                return BadRequest("Problemas para agregar nueva iamgen del producto");
            }

            return imageUpload;
        }


        [HttpPut("update-product")]
        public async Task<ActionResult> UpdateProducto(ProductDto productDto)
        {
            if (!await productAdminRepository.ValidateUserAdministrator(User.GetClientId()))
                return BadRequest("Access denied to this user");

            if (!await productAdminRepository.ValidarExisteProducto(productDto.Id)) return BadRequest("Producto solicitado no fue encontrado");

            productAdminRepository.UpdateProduct(productDto);
            if (await productAdminRepository.SaveAllAsync())
            {
                return Ok();
            }

            return BadRequest("Problemas para actualizar el producto seleccionado");
        }


        [HttpDelete("delete-product/{id}")]
        public async Task<ActionResult> DeleteProdut(string id)
        {
            if (!await productAdminRepository.ValidateUserAdministrator(User.GetClientId()))
                return BadRequest("Access denied to this user");

            if (await productAdminRepository.DeleteProduct(id)) //productId
            {
                return Ok();
            }
            return BadRequest("Problemas para eliminar el producto seleccionado");
        }


        [HttpDelete("delete-photobyid/{id}")] //{publicId}
        public async Task<ActionResult> DeletePhotoByIdAsync(int id)
        {           

            if (!await productAdminRepository.ValidateUserAdministrator(User.GetClientId()))
                return BadRequest("Access denied to this user");

            if (await productAdminRepository.DeleteProductPhotoByIdAsync(id) != null)
            {
                if (await productAdminRepository.SaveAllAsync())
                {
                    return NoContent();
                }

                return BadRequest("Problemas para eliminar foto del Cloud y DB");
            }
            else
            {
                return BadRequest();
            }
        }
    }
}
