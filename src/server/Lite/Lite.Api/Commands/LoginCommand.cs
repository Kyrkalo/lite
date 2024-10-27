using Lite.Api.Commands.Interfaces;
using Lite.Api.Dtos;
using Lite.Api.Services.Interfaces;

namespace Lite.Api.Commands;

public class LoginCommand(IAuthService authService) : ICommand<TokensDto>
{
    private readonly IAuthService _authService = authService;

    public async ValueTask<bool> CanExecute(object parameter)
    {
        return await ValueTask.FromResult(true);
    }

    public async Task<CommandResult<TokensDto>> Execute(object parameter, CancellationToken cancellationToken)
    {
        TokensDto tokensDto = null;
        if (parameter is LoginDto login)
        {
            tokensDto = await _authService.Signin(login);
        }
        return new CommandResult<TokensDto>
        {
            Success = true,
            Result = tokensDto
        };
    }
}
