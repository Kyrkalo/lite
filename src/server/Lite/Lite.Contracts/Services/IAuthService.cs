using Lite.Models.Dtos;
using System.Security.Claims;

namespace Lite.Contracts.Services;

public interface IAuthService
{
    ValueTask<TokensDto> Signin(LoginDto login);

    Task Logout(ClaimsPrincipal claimsPrincipal);

    Task<TokensDto> Register(RegisterDto register);
}
