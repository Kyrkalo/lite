using Lite.Api.CustomAttributes;
using Lite.Api.Dtos;
using Lite.Api.Extensions;
using Lite.Api.Services.Interfaces;
using Lite.Api.Validators;
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
            var user = await _userService.Get(new Models.User(username));
            var userDto = user.ToUserDto();
            return Ok(userDto);
        }

        [Authorize]
        [HttpPost("")]
        [ServiceFilter(typeof(ValitatorAttribute<UserDtoValidator, UserDto>))]
        public async Task<ActionResult> Update([FromBody] UserDto userDto)
        {
            var username = User.Identity.Name;
            var user = await _userService.Get(new Models.User(username));
            await _userService.Update(user, userDto.ToUser());
            return Ok("");
        }
    }
}
