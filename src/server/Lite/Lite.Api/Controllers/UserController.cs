using Lite.Api.CustomAttributes;
using Lite.Api.Extensions;
using Lite.Api.Queries;
using Lite.Api.Validators;
using Lite.Contracts.Services;
using Lite.Models.Data;
using Lite.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(UserQueryHandler userQueryHandler) : ControllerBase
    {
        private readonly IUserService _userService;

        private readonly UserQueryHandler _userQueryHandler = userQueryHandler;

        [Authorize]
        [HttpGet("")]
        public async Task<ActionResult> Get()
        {
            var userDto = await _userQueryHandler.HandleAsync(User.Identity.Name);
            return Ok(userDto);
        }

        [Authorize]
        [HttpPost("")]
        [ServiceFilter(typeof(ValitatorAttribute<UserDtoValidator, UserDto>))]
        public async Task<ActionResult> Update([FromBody] UserDto userDto)
        {
            var username = User.Identity.Name;
            var user = await _userService.Get(new User(username));
            await _userService.Update(user, userDto.ToUser());
            return Ok("");
        }
    }
}
