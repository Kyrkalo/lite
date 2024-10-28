using Lite.Contracts.Commands;
using Lite.Contracts.Services;
using Lite.Models.Dtos;

namespace Lite.Api.Commands.Auth;

public class LoginCommand(IAuthService authService) : ILoginCommand
{
    private readonly IAuthService _authService = authService;

    public async ValueTask<bool> CanExecute(object parameter, CancellationToken cancellationToken)
    {
        return await ValueTask.FromResult(true);
    }

    public async Task<CommandResult> Execute(object parameter, CancellationToken cancellationToken)
    {
        TokensDto tokensDto = null;
        if (parameter is LoginDto login)
        {
            tokensDto = await _authService.Signin(login);
        }
        return new CommandResult
        {
            Success = true,
            Result = tokensDto
        };
    }
}