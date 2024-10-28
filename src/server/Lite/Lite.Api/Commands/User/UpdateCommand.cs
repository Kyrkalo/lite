using Lite.Api.Extensions;
using Lite.Contracts.Commands;
using Lite.Contracts.Services;

namespace Lite.Api.Commands.User;

public class UpdateCommand(IUserService userService) : IUpdateUserCommand
{
    private readonly IUserService _userService = userService;

    public async ValueTask<bool> CanExecute(object parameter, CancellationToken cancellationToken)
    {
        bool result = parameter is Update update && update.Username == update.IdentityName;
        return await ValueTask.FromResult(result);
    }

    public async Task<CommandResult> Execute(object parameter, CancellationToken cancellationToken)
    {
        if (parameter is Update update)
        {
            var user = await _userService.Get(new Models.Data.User(update.Username));
            await _userService.Update(user, update.ToUser());
        }
        return new CommandResult()
        {
            Success = true
        };
    }
}

public struct Update
{
    public string Username { get; set; }
    public string Phone { get; set; }
    public string Email { get; set; }
    public string Avatar {  get; set; }
    public string IdentityName { get; set; }
}
