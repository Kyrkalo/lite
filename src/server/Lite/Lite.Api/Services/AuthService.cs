using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Api.Dtos;
using Lite.Api.Extensions;
using Lite.Api.Models;
using Lite.Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using ZstdSharp.Unsafe;

namespace Lite.Api.Services;

public class AuthService(ITokenService tokenService,
    UserManager<ApplicationUser> userManager,
    SignInManager<ApplicationUser> signInManager) : IAuthService
{
    private readonly ITokenService _tokenService = tokenService;
    private readonly UserManager<ApplicationUser> _userManager = userManager;
    private readonly SignInManager<ApplicationUser> _signInManager = signInManager;

    public async ValueTask<TokensDto> Signin(LoginDto login)
    {
        var user = await _userManager.FindByNameAsync(login.UserName);

        if (user != null)
        {
            var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);
            if (result.Succeeded)
            {
                var (accessToken, refreshToken) = await SetTokens(user, true);
                return new TokensDto(accessToken.Value, refreshToken.Value);
            }
        }
        return default;
    }

    public async Task Logout(ClaimsPrincipal claimsPrincipal)
    {
        var user = await _userManager.GetUserAsync(claimsPrincipal);
        if (user != null)
        {
            user.Tokens.Clear();
            var updateResult = await _userManager.UpdateAsync(user);
            if (updateResult.Succeeded)
            {
                await _signInManager.SignOutAsync();
            }
        }
    }

    public async Task<TokensDto> Register(RegisterDto register)
    {
        var user = register.ToApplicationUser();
        var result = await _userManager.CreateAsync(user, register.Password);
        if (result.Succeeded)
        {
            var (accessToken, refreshToken) = await SetTokens(user);
            return new TokensDto(accessToken.Value, refreshToken.Value);
        }
        return default;
    }

    private async Task<(Token accessToken, Token refreshToken)> SetTokens(ApplicationUser user, bool clearTokens = false)
    {
        var (accessToken, refreshToken) = _tokenService.Generate(user.Id.ToString(), user.UserName);
        if (clearTokens)
        {
            user.Tokens.Clear();
        }    
        user.Tokens.Add(accessToken);
        user.Tokens.Add(refreshToken);
        await _userManager.UpdateAsync(user);
        return (accessToken, refreshToken);
    }
}
