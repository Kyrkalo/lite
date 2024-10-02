using AspNetCore.Identity.MongoDbCore.Models;

namespace Lite.Api.Models;

public class ApplicationUser : MongoIdentityUser<Guid> { }
