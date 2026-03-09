using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class UserType
{
    public int Id { get; set; }
    public required string TipoUsuario { get; set; }


    [JsonIgnore]
    public List<AppUser> AppUsers { get; set; } = [];
}
