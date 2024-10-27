using Lite.Api.Commands;
using Lite.Api.Commands.Interfaces;

namespace Lite.Api.Pipeline.Interfaces;

public interface IPipeline
{
    void AddCommand(ICommand command, Action<CommandResult> onResult = null);

    Task RunAsync(object param, CancellationToken cancellationToken);
}
