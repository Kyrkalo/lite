namespace Lite.Contracts.Commands;

public struct CommandResult
{
    public bool Success { get; set; }
    public string Error { get; set; }
    public object Result { get; set; } 
}
