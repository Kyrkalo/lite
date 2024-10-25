using Lite.Api.Dtos;
using Lite.Api.Extensions;
using Lite.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        public UserController(IUserService userService) 
        {
            _userService = userService;
        }

        [Authorize]
        [HttpGet("")]
        public async Task<ActionResult> Get()
        {
            var username = User.Identity.Name;
            var result = await _userService.Get(new Models.User(username));
            return Ok(result);
        }

        [Authorize]
        [HttpPost("")]
        public async Task<ActionResult> Update([FromBody] UserDto userDto)
        {
            var user = userDto.ToUser();
            await _userService.Update(user);
            return Ok("");
        }
    }
}
