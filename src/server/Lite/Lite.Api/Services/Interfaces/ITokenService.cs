using Lite.Api.Models;
using System.Security.Claims;

namespace Lite.Api.Services.Interfaces;

public interface ITokenService
{
    ClaimsPrincipal Validate(string token);

    string Generate(string id, string username);
}
