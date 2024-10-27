namespace Lite.Api.Commands.Interfaces;

public interface ICommand<T>
{
    ValueTask<bool> CanExecute(object parameter);
    Task<CommandResult<T>> Execute(object parameter, CancellationToken cancellationToken); 
}
