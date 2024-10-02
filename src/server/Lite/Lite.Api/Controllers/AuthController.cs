using Lite.Api.Services;
using Microsoft.AspNetCore.Mvc;

namespace Lite.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController
{
    private readonly ITokenService _tokenService;

    public AuthController(ITokenService tokenService)
    {
        _tokenService = tokenService;
    }

    [HttpGet(Name = "generate")]
    public string Generate()
    {
        return _tokenService.Generate(new Models.ApplicationUser() { UserName = "@Remi", Id = Guid.NewGuid()});
    }
}
