using Microsoft.AspNetCore.Mvc;
using Lite.Api.Dtos;
using Lite.Api.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Lite.Api.CustomAttributes;

namespace Lite.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController(IAuthService authService) : ControllerBase
{
    private readonly IAuthService _authService = authService;

    [AllowAnonymous]
    [HttpPost("Register")]
    [ServiceFilter(typeof(RegisterDtoValidateAttribute))]
    public async Task<ActionResult> Register(RegisterDto register)
    {
        var result = await _authService.Register(register);
        return Ok(result);
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    [ServiceFilter(typeof(UserDtoValidateAttribute))]
    public async Task<ActionResult<TokensDto>> Login(LoginDto login)
    {
        var tokens = await _authService.Signin(login);
        return Ok(tokens);
    }

    [HttpPost("Logout")]
    public async Task<ActionResult> Logout()
    {
        await _authService.Logout(User);
        return Ok();
    }
}
