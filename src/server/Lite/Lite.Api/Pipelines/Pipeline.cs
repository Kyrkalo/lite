using Lite.Api.Commands;
using Lite.Api.Commands.Interfaces;
using Lite.Api.Pipeline.Interfaces;

namespace Lite.Api.Pipelines;

public class Pipeline : IPipeline
{
    private readonly List<(ICommand command, Action<CommandResult> action)> _steps;

    public Pipeline() => _steps = [];

    public void AddCommand(ICommand command, Action<CommandResult> onResult = null) => _steps.Add(new(command, onResult));

    public async Task RunAsync(object param, CancellationToken cancellationToken)
    {
        foreach (var command in _steps)
        {
            if (await command.command.CanExecute(param, cancellationToken))
            {
                var result = await command.command.Execute(param, cancellationToken);
                command.action?.Invoke(result);
            }
        }
    }
}
