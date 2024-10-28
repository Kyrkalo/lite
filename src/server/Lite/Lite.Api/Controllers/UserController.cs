using Lite.Api.Commands.User;
using Lite.Api.CustomAttributes;
using Lite.Api.Extensions;
using Lite.Api.Queries;
using Lite.Api.Validators;
using Lite.Contracts.Commands;
using Lite.Contracts.Services;
using Lite.Models.Data;
using Lite.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(UserQueryHandler userQueryHandler, IUpdateUserCommand updateUserCommand) : ControllerBase
    {
        private readonly IUpdateUserCommand _updateUserCommand = updateUserCommand;
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
        public async Task<ActionResult> Update([FromBody] UserDto userDto, CancellationToken cancellationToken)
        {
            var update = new Update()
            {
                Avatar = userDto.Avatar,
                Email = userDto.Email,
                Phone = userDto.Phone,
                Username = userDto.UserName,
                IdentityName = User.Identity.Name
            };
            if (await _updateUserCommand.CanExecute(update, cancellationToken))
            {

            }
            return Ok();
        }
    }
}
