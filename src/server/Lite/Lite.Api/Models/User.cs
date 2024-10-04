using MongoDB.Bson.Serialization.Attributes;

namespace Lite.Api.Models;

public class User
{
    [BsonElement("user_name")]
    public string UserName { get; set; }

    [BsonElement("password")]
    public string Password { get; set; }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("phone")]
    public string Phone { get; set; }

    [BsonId]
    [BsonElement("id")]
    public string Id { get; set; }
}
