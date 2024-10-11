using System.Security.Claims;

namespace Lite.Api.Services.Interfaces;

public interface ITokenService
{
    ClaimsPrincipal Validate(string token);

    (string token, string refreshToken) Generate(string id, string username);
}
