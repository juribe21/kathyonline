using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace API.Entities
{
    public class PuntoEntrega
    {
        [Key]
        public int Id { get; set; }
        public required string LugarEntrega { get; set; }
    }
}