namespace Lite.Api.Commands;

public class CommandResult<T>
{
    public bool Success { get; set; }
    public string Error { get; set; }
    public T Result { get; set; } 
}
