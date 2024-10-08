using Lite.Api.Middleware;

var builder = WebApplication.CreateBuilder(args);

var configuration = builder.Configuration;
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.SetupServices();
builder.SetupMongoDbIdentity(configuration);
builder.SetupAuthentication(configuration);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(builder =>
builder.SetIsOriginAllowed(_ => true)
.AllowAnyMethod()
.AllowAnyHeader()
.AllowCredentials());

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

public class MongoDbContextOptions
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}
