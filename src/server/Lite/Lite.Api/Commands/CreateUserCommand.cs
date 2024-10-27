using Lite.Api.Extensions;
using Lite.Contracts.Commands;
using Lite.Contracts.Services;
using Lite.Models.Dtos;

namespace Lite.Api.Commands;

public class CreateUserCommand(IUserService userService) : ICreateUserCommand
{
    private readonly IUserService _userService = userService;

    public async ValueTask<bool> CanExecute(object parameter, CancellationToken cancellationToken)
    {
        return await ValueTask.FromResult(true);
    }

    public async Task<CommandResult> Execute(object parameter, CancellationToken cancellationToken)
    {
        if (parameter is RegisterDto register)
        {
            await _userService.Create(register.ToUser());
        }
        return new CommandResult()
        {
            Success = true
        };
    }
}
