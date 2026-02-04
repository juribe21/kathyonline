using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs;

public class ClientUpdateDto
{
    public required string Name { get; set; }
    public required string LastName { get; set; }
    public required string Telefono { get; set; }
    public required string City { get; set; }
    public string? Description { get; set; }
    public required string Country { get; set; }
}
