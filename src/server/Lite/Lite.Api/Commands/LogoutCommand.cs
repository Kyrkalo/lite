using Lite.Api.Commands.Interfaces;
using Lite.Api.Services.Interfaces;
using System.Security.Claims;

namespace Lite.Api.Commands;

public interface ILogoutCommand : ICommand;

public class LogoutCommand(IAuthService authService) : ILogoutCommand
{
    private readonly IAuthService _authService = authService;

    public async ValueTask<bool> CanExecute(object parameter, CancellationToken cancellationToken)
    {
        return await ValueTask.FromResult(true);
    }

    public async Task<CommandResult> Execute(object parameter, CancellationToken cancellationToken)
    {
        if (parameter is ClaimsPrincipal user)
        {
            await _authService.Logout(user);
        }
        return new CommandResult()
        {
            Success = true,
        };
    }
}
