using Lite.Contracts.Commands;

namespace Lite.Contracts.Pipelines;

public interface IPipeline
{
    void AddCommand(ICommand command, Action<CommandResult> onResult = null);

    Task RunAsync(object param, CancellationToken cancellationToken);
}
