namespace Lite.Api.Commands.Interfaces;

public interface ICommand
{
    ValueTask<bool> CanExecute(object parameter, CancellationToken cancellationToken);
    Task<CommandResult> Execute(object parameter, CancellationToken cancellationToken); 
}
