using Lite.Models.Dtos;
using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ContactController : ControllerBase
    {
        [HttpPost(Name = "invite")]
        public ActionResult Invite(InviteDto inviteDto)
        {
            return Ok("Service works");
        }
    }
}
