using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Api.Models.Enums;

namespace Lite.Api.Models;

public class ApplicationUser : MongoIdentityUser<Guid> 
{
    public VerifyType Verify { get; set; }
}
