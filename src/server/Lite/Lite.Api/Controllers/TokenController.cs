using Lite.Contracts.Services;
using Lite.Models.Dtos;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public TokenController(ITokenService tokenService) 
        { 
            _tokenService = tokenService;
        }

        [AllowAnonymous]
        [HttpPost("Refresh")]
        public async Task<ActionResult<(string, string)>> RefreshToken([FromBody] RefreshTokenDto refreshTokenDto)
        {
            var tokens = await _tokenService.Refresh(refreshTokenDto);
            if (tokens == null)
            {
                return Unauthorized("Invalid refresh token");
            }
            return Ok(tokens);
        }

        [AllowAnonymous]
        [HttpPost("Validate")]
        public async Task<ActionResult<bool>> Validate([FromBody] ValidateTokenDto validateTokenDto)
        {
            var tokens = await _tokenService.Validate(validateTokenDto.Token);
            if (tokens == null)
            {
                return Unauthorized("Invalid refresh token");
            }
            return Ok();
        }
    }
}
