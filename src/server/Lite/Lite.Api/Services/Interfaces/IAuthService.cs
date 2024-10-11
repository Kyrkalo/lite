using Lite.Api.Dtos;
using System.Security.Claims;

namespace Lite.Api.Services.Interfaces;

public interface IAuthService
{
    ValueTask<TokensDto> Signin(LoginDto login);

    Task Logout(ClaimsPrincipal claimsPrincipal);

    Task<bool> Register(RegisterDto register);
}
