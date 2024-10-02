using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Api.Models;
using Lite.Api.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var configuration = builder.Configuration;

builder.Services.AddScoped<ITokenService, TokenService>();

IConfigurationSection jwtSettings = configuration.GetSection("JwtSettings");
IConfigurationSection mongoSettings = configuration.GetSection("MongoDbSettings");
var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);

builder.Services.AddIdentity<ApplicationUser, MongoIdentityRole>()
.AddMongoDbStores<ApplicationUser, MongoIdentityRole, Guid>(mongoSettings["ConnectionString"], mongoSettings["DatabaseName"])
.AddDefaultTokenProviders();

// JWT configuration

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.RequireHttpsMetadata = false;
    options.SaveToken = true;
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false,
        RequireExpirationTime = true,
        ValidateLifetime = true
    };
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

public class MongoDbContextOptions
{
    public string ConnectionString { get; set; }
    public string DatabaseName { get; set; }
}
