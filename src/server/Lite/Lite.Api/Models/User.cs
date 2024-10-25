using MongoDB.Bson.Serialization.Attributes;

namespace Lite.Api.Models;

public class User
{
    public User() { }

    public User(string username) : base()
    {
        UserName = username;
    }

    [BsonId]
    [BsonElement("id")]
    public string Id { get; set; }

    [BsonElement("user_name")]
    public string UserName { get; set; }

    [BsonElement("email")]
    public string Email { get; set; }

    [BsonElement("phone")]
    public string Phone { get; set; }
}