using Microsoft.AspNetCore.Mvc;
using Lite.Api.Dtos;
using Lite.Api.Services.Interfaces;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using System;
using Lite.Api.CustomAttributes;
using Lite.Api.Extensions;
using Lite.Api.Validators;
using Microsoft.AspNetCore.Identity;
using Lite.Api.Models;

namespace Lite.Api.Controllers;

[ApiController]
[Route("[controller]")]
public class AuthController
{
    private readonly ITokenService _tokenService;
    private readonly IUserService _userService;

    private readonly UserManager<ApplicationUser> _userManager;
    private readonly SignInManager<ApplicationUser> _signInManager;

    public AuthController(ITokenService tokenService, 
        IUserService userService, 
        UserManager<ApplicationUser> userManager, 
        SignInManager<ApplicationUser> signInManager)
    {
        _tokenService = tokenService;
        _userService = userService;
        _userManager = userManager;
        _signInManager = signInManager;
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    [ServiceFilter(typeof(UserDtoValidateAttribute))]
    public async Task<string> Login(LoginDto login)
    {
        var user = await _userManager.FindByNameAsync(login.UserName);
        if (user == null)
        {
            throw new Exception("Invalid user name");
        }

        var result = await _signInManager.CheckPasswordSignInAsync(user, login.Password, false);

        if (!result.Succeeded)
        {
            throw new Exception("Invalid username or password.");
        }

        var token = _tokenService.Generate(user.Id.ToString(), user.UserName); 

        return token;
    }

    [AllowAnonymous]
    [HttpPost("Register")]
    [ServiceFilter(typeof(RegisterDtoValidateAttribute))]
    public async Task<string> Register(RegisterDto register)
    {
        var user = new ApplicationUser
        {
            UserName = register.UserName,
            Email = register.Email,
            PhoneNumber = register.Phone
        };

        var result = await _userManager.CreateAsync(user, register.Password);

        if (!result.Succeeded)
        {
            throw new Exception("Can't register user");
        }

        return "Success";
    }
}
