using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Gender
{
    public int Id { get; set; }
    public required string GenderName { get; set; }

    [JsonIgnore]
    public List<Client> Clients { get; set; } = [];
}
