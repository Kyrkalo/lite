using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        [Authorize]
        [HttpGet("get")]
        public async Task<ActionResult> Get(string userid)
        {
            await Task.FromResult(0);
            return Ok("");
        }
    }
}
