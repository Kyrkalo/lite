using Lite.Api.Models;
using System.Security.Claims;

namespace Lite.Api.Services;

public interface ITokenService
{
    ClaimsPrincipal Validate(string token);

    string Generate(ApplicationUser user);
}
