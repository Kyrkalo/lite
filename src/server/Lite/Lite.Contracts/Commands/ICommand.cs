namespace Lite.Contracts.Commands;

public interface ICommand
{
    ValueTask<bool> CanExecute(object parameter, CancellationToken cancellationToken);
    Task<CommandResult> Execute(object parameter, CancellationToken cancellationToken); 
}
