using Lite.Api.Commands.Interfaces;
using Lite.Api.Dtos;
using Lite.Api.Services.Interfaces;
using Lite.Api.Extensions;

namespace Lite.Api.Commands
{
    public class RegisterCommand(IAuthService authService, IUserService userService) : ICommand<TokensDto>
    {
        private readonly IAuthService _authService = authService;
        private readonly IUserService _userService = userService;

        public ValueTask<bool> CanExecute(object parameter)
        {
            return ValueTask.FromResult(true);
        }

        public async Task<CommandResult<TokensDto>> Execute(object parameter, CancellationToken cancellationToken)
        {
            TokensDto tokensDto = null;
            if (parameter is RegisterDto register)
            {
                tokensDto = await _authService.Register(register);
                var user = register.ToUser();
                await _userService.Create(user);
            }
            return new CommandResult<TokensDto>()
            {
                Success = true,
                Result = tokensDto
            };
        }
    }
}
