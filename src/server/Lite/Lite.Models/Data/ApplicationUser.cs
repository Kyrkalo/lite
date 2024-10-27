using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Models.Data.Enums;

namespace Lite.Models.Data;

public class ApplicationUser : MongoIdentityUser<Guid> 
{
    public VerifyType Verify { get; set; }
}
