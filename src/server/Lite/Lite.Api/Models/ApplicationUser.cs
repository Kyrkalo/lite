using AspNetCore.Identity.MongoDbCore.Models;
using System;

namespace Lite.Api.Models;

public class ApplicationUser : MongoIdentityUser<Guid> { }
