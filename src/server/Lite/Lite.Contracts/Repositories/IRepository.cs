using MongoDB.Driver;

namespace Lite.Contracts.Repositories;

public interface IRepository<T> where T : class
{
    Task<IEnumerable<T>> GetAllAsync();

    Task<T> GetByIdAsync(string id);

    Task CreateAsync(T entity);

    Task UpdateAsync(string id, T entity);

    Task DeleteAsync(string id);

    Task<IEnumerable<T>> FindAsync(FilterDefinition<T> filter);
}
