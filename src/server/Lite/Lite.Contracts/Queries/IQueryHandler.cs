namespace Lite.Contracts.Queries;

public interface IQueryHandler<TQuery, TOutput>
{
    Task<TOutput> HandleAsync(TQuery query);
}
