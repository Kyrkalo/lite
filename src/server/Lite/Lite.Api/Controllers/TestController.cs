using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        [HttpGet()]
        public ActionResult Invite()
        {
            return Ok("Service works");
        }
    }
}
