using Lite.Api.Repositories.Interfaces;
using MongoDB.Bson;
using MongoDB.Driver;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Lite.Api.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    private readonly IMongoCollection<T> _collection;

    public Repository(IMongoDatabase database)
    {
        _collection = database.GetCollection<T>(typeof(T).Name);
    }

    public async Task CreateAsync(T entity) => await _collection.InsertOneAsync(entity);

    public async Task DeleteAsync(string id)
    {
        var filter = Builders<T>.Filter.Eq("Id", id);
        var result = await _collection.DeleteOneAsync(filter);
    }

    public async Task<IEnumerable<T>> GetAllAsync() => await _collection.Find(new BsonDocument()).ToListAsync();

    public async Task<T> GetByIdAsync(string id)
    {
        var filter = Builders<T>.Filter.Eq("Id", id);
        return await _collection.Find(filter).FirstOrDefaultAsync();
    }

    public async Task UpdateAsync(string id, T entity)
    {
        var filter = Builders<T>.Filter.Eq("Id", id);
        var result = await _collection.ReplaceOneAsync(filter, entity);
    }

    public async Task<IEnumerable<T>> FindAsync(FilterDefinition<T> filter) => await _collection.Find(filter).ToListAsync();
}
