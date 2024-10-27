using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Lite.Api.CustomAttributes;
using Lite.Api.Validators;
using Lite.Models.Dtos;
using Lite.Contracts.Pipelines;
using Lite.Contracts.Commands;

namespace Lite.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController(IPipeline pipeline,
    IRegisterCommand registerCommand,
    ICreateUserCommand createUserCommand,
    ILoginCommand loginCommand,
    ILogoutCommand logoutCommand) : ControllerBase
{
    private readonly IPipeline _pipeline = pipeline;
    private readonly IRegisterCommand _registerCommand = registerCommand;
    private readonly ICreateUserCommand _createUserCommand = createUserCommand;
    private readonly ILoginCommand _loginCommand = loginCommand;
    private readonly ILogoutCommand _logoutCommand = logoutCommand;


    [AllowAnonymous]
    [HttpPost("Register")]
    [ServiceFilter(typeof(ValitatorAttribute<RegisterDtoValidator, RegisterDto>))]
    public async Task<ActionResult> Register(RegisterDto register, CancellationToken cancellationToken)
    {
        TokensDto tokens = null;
        _pipeline.AddCommand(_registerCommand, e => { tokens = (TokensDto)e.Result; });
        _pipeline.AddCommand(_createUserCommand);
        await _pipeline.RunAsync(register, cancellationToken);
        return Ok(tokens);
    }

    [AllowAnonymous]
    [HttpPost("Login")]
    [ServiceFilter(typeof(ValitatorAttribute<LoginDtoValidator, LoginDto>))]
    public async Task<ActionResult<TokensDto>> Login(LoginDto login, CancellationToken cancellationToken)
    {
        TokensDto tokens = null;
        _pipeline.AddCommand(_loginCommand, e => { tokens = (TokensDto)e.Result; });
        await _pipeline.RunAsync(login, cancellationToken);
        return Ok(tokens);
    }

    [HttpPost("Logout")]
    public async Task<ActionResult> Logout(CancellationToken cancellationToken)
    {
        await _loginCommand.Execute(User, cancellationToken);
        return Ok();
    }
}
