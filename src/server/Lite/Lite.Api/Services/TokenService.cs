using Lite.Api.Services.Interfaces;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Lite.Api.Services;

public class TokenService : ITokenService
{
    private readonly ILogger _logger;
    private readonly IConfigurationSection _jwtSettings;

    private readonly IConfiguration _configuration;

    public TokenService(IConfiguration configuration)
    {
        _configuration = configuration;
        _jwtSettings = _configuration.GetSection("JwtSettings");
    }

    public ClaimsPrincipal Validate(string token)
    {
        var key = Encoding.ASCII.GetBytes(_jwtSettings["Secret"]);
        var tokenHandler = new JwtSecurityTokenHandler();

        try
        {
            var principal = tokenHandler.ValidateToken(token, new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = true
            }, out SecurityToken validatedToken);

            return principal;
        }
        catch (Exception ex) 
        {
            _logger.LogError(ex, ex.Message);
        }
        return default;
    }

    public string Generate(string id, string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings["Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var claims = new[]
        {
            new Claim(JwtRegisteredClaimNames.Sub, username),
            new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            new Claim(ClaimTypes.NameIdentifier, id)
        };
        var token = new JwtSecurityToken(
        claims: claims,
        expires: DateTime.Now.AddMinutes(60),
        signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
