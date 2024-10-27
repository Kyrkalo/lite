using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Contracts.Services;
using Lite.Models.Data;
using Lite.Models.Dtos;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace Lite.Api.Services;

public class TokenService : ITokenService
{
    private readonly IConfigurationSection _jwtSettings;
    private readonly IConfiguration _configuration;
    private readonly UserManager<ApplicationUser> _userManager;

    public TokenService(IConfiguration configuration, UserManager<ApplicationUser> userManager)
    {
        _configuration = configuration;
        _jwtSettings = _configuration.GetSection("JwtSettings");
        _userManager = userManager;
    }

    public async Task<ClaimsPrincipal> Validate(string token)
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
            var claim = principal.Claims.FirstOrDefault(e => e.Properties.Any(l => l.Value == JwtRegisteredClaimNames.Sub));
            if (claim != null)
            {
                var user = await _userManager.FindByNameAsync(claim.Value);
                if (user != null &&  user.Tokens.Any(e => e.Value == token)) 
                {
                    return principal;
                }
            }
        }
        catch (Exception ex) 
        {
        }
        return default;
    }

    public (Token accessToken, Token refreshToken) Generate(string id, string username)
    {
        var uniqueName = Guid.NewGuid().ToString();
        var token = new Token()
        {
            Value = GetToken(id, username),
            Name = uniqueName,
            LoginProvider = "AccessToken"
        };
        var refreshToken = new Token()
        {
            Value = GetRefreshToken(),
            Name = uniqueName,
            LoginProvider = "RefreshToken"
        };
        return (token, refreshToken);
    }

    public async Task<(Token accessToken, Token refreshToken)?> Refresh(RefreshTokenDto refreshTokenDto)
    {
        var user = await _userManager.FindByNameAsync(refreshTokenDto.Username);
        var refreshtoken = user.Tokens.Find(e => e.Value == refreshTokenDto.Token);
        if (refreshtoken is not null)
        {
            var (newAccessToken, newRefreshToken) = Generate(user.Id.ToString(), user.UserName);
            user.Tokens.Add(newAccessToken);
            user.Tokens.Add(newRefreshToken);

            var accessToken = user.Tokens.Find(e => e.Name == refreshtoken.Name);
            user.Tokens.Remove(refreshtoken);
            user.Tokens.Remove(accessToken);

            await _userManager.UpdateAsync(user);
            return (newAccessToken, newRefreshToken);
        }

        await Task.FromResult(0);
        return default;
    }

    /// <summary>
    /// Returns refresh token. This is temporary solution and need to be updated.
    /// </summary>
    /// <returns></returns>
    private static string GetRefreshToken()
    {
        var randomBytes = new byte[64];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomBytes);
        return Convert.ToBase64String(randomBytes);
    }

    private string GetToken(string id, string username)
    {
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtSettings["Secret"]));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var tokenHandler = new JwtSecurityToken(
        claims: GetClaims(id, username),
        expires: DateTime.Now.AddMinutes(60),
        signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(tokenHandler);
    }

    private static IEnumerable<Claim> GetClaims(string id, string username) => 
    [
        new Claim(JwtRegisteredClaimNames.Name, username),
        new Claim(JwtRegisteredClaimNames.PreferredUsername, username),
        new Claim(JwtRegisteredClaimNames.Nickname, username),
        new Claim(JwtRegisteredClaimNames.FamilyName, username),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.NameIdentifier, id),
        new Claim(JwtRegisteredClaimNames.Iss, "lite"),
        new Claim(JwtRegisteredClaimNames.Aud, "lite.api"),
        new Claim(JwtRegisteredClaimNames.Iat, DateTimeOffset.UtcNow.ToUnixTimeSeconds().ToString()),
        new Claim(JwtRegisteredClaimNames.Nonce, Guid.NewGuid().ToString()) //A value used to associate a client session with an ID token to mitigate replay attacks.
    ];
}
