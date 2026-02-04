using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities;
public class Categoria
{
    public required string Id { get; set; } = Guid.NewGuid().ToString();
    public required string CategoryName { get; set; }
            // Navigation Propperties
    [JsonIgnore]
    public List<Product> Products {get; set; } = [];
    
}
