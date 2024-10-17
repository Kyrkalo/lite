using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Api.Dtos;
using System.Security.Claims;

namespace Lite.Api.Services.Interfaces;

public interface ITokenService
{
    Task<ClaimsPrincipal> Validate(string token);

    (Token accessToken, Token refreshToken) Generate(string id, string username);

    Task<(Token accessToken, Token refreshToken)?> Refresh(RefreshTokenDto refreshTokenDto);
}
