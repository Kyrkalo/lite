using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Api.Dtos;
using Lite.Api.Models;
using Lite.Api.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

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
                var tokens = _tokenService.Generate(user.Id.ToString(), user.UserName);
                user.Tokens.Add(new Token
                {
                    Value = tokens.refreshToken,
                    LoginProvider = "RefreshToken",
                    Name = "RefreshToken",
                });
                await _userManager.UpdateAsync(user);
                return new TokensDto(tokens.token, tokens.refreshToken);
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

    public async Task<bool> Register(RegisterDto register)
    {
        var user = new ApplicationUser
        {
            UserName = register.UserName,
            Email = register.Email,
            PhoneNumber = register.Phone
        };

        var result = await _userManager.CreateAsync(user, register.Password);
        return result.Succeeded;
    }
}
