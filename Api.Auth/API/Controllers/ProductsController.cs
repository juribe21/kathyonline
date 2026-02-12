using API.Data;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ProductsController(IProductRepository productRepository) : BaseApiController
    {
        [HttpGet("GetProducts/{cat}")]
        public async Task<ActionResult<IReadOnlyList<Product>>> GetProducts(string cat)
        {
            try
            {
                var products = await productRepository.GetProductsAsync(cat);
                return Ok(products);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetUser(string id)
        {
            var product = await productRepository.GetProductByIdAsync(id);

            if (product != null)
            {
                return Ok(product);
            }
            else
            {
                return NotFound();
            }
        }
    }
}
