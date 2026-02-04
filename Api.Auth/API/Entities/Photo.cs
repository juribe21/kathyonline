using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }

    // Navigation Properties
    [JsonIgnore]
    public Client Client { get; set; } = null!;
    public string ClientId { get; set; } = null!;
}