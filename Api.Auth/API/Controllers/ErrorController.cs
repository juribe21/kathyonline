using System;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class ErrorController : BaseApiController
{
        // 401 Error
        [HttpGet("auth")]
        public IActionResult GetAuth()
        {
            return Unauthorized();
        }


        // 404 Error
        [HttpGet("not-found")]
        public IActionResult GetNotFound()
        {
            return NotFound();
        }

        // Test 500 Error - 400 Error
        [HttpGet("server-error")]
        public IActionResult GetServerError()
        {
            throw new Exception("This is a server error");
        }

        // Test 400
        [HttpGet("bad-request")]
        public IActionResult GetBadRequest()
        {
            return BadRequest("This was not a good request");
        }
}
