using Lite.Contracts.Commands;
using Lite.Contracts.Services;
using Lite.Models.Dtos;

namespace Lite.Api.Commands;

public class RegisterCommand(IAuthService authService) : IRegisterCommand
{
    private readonly IAuthService _authService = authService;

    public ValueTask<bool> CanExecute(object parameter, CancellationToken cancellationToken)
    {
        return ValueTask.FromResult(true);
    }

    public async Task<CommandResult> Execute(object parameter, CancellationToken cancellationToken)
    {
        TokensDto tokensDto = null;
        if (parameter is RegisterDto register)
        {
            tokensDto = await _authService.Register(register);
        }
        return new CommandResult()
        {
            Success = true,
            Result = tokensDto
        };
    }
}
