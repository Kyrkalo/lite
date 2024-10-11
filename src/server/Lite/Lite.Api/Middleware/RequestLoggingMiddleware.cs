namespace Lite.Api.Middleware
{
    public class RequestLoggingMiddleware(RequestDelegate next)
    {
        private readonly RequestDelegate _next = next;

        public async Task InvokeAsync(HttpContext context)
        {
            Console.WriteLine($"Request: {context.Request.Method} {context.Request.Path}");
            await _next(context);
            Console.WriteLine($"Response: {context.Response.StatusCode}");
        }
    }
}
