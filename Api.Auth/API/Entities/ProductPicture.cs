using System.Text.Json.Serialization;

namespace API.Entities
{
    public class ProductPicture
    {
        public int Id { get; set; }
        public required string Url { get; set; }
        public string? PublicId { get; set; }

        [JsonIgnore]
        public Product Product { get; set; }
        public string ProductId { get; set; }
    }
}
