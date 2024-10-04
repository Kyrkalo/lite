using Lite.Api.Services.Interfaces;
using Lite.Api.Services;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using AspNetCore.Identity.MongoDbCore.Models;
using Lite.Api.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Lite.Api.Repositories.Interfaces;
using Lite.Api.Repositories;
using Lite.Api.Validators;
using MongoDB.Driver;
using Lite.Api.CustomAttributes;

namespace Lite.Api.Middleware;

public static class Setup
{
    public static void SetupServices(this WebApplicationBuilder builder)
    {
        var config = builder.Configuration;
        builder.Services.AddScoped<ITokenService, TokenService>();
        builder.Services.AddScoped<IUserService, UserService>();
        builder.Services.AddScoped<IRepository<User>,  Repository<User>>();

        builder.Services.AddScoped<UserDtoValidator>();
        builder.Services.AddScoped<RegisterDtoValidator>();
        builder.Services.AddScoped<UserDtoValidateAttribute>();
        builder.Services.AddScoped<RegisterDtoValidateAttribute>();
    }

    public static void SetupMongoDbIdentity(this WebApplicationBuilder builder, ConfigurationManager configuration)
    {
        IConfigurationSection mongoSettings = configuration.GetSection("MongoDbSettings");

        builder.Services.AddScoped<IMongoDatabase>(e => 
        {
            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(mongoSettings["ConnectionString"]));
            //settings.SslSettings = new SslSettings() { EnabledSslProtocols = SslProtocols.Tls12 };
            var mongoClient = new MongoClient(settings);
            return mongoClient.GetDatabase(mongoSettings["AppDb"]);
        });

        builder.Services.AddIdentity<ApplicationUser, MongoIdentityRole>()
        .AddMongoDbStores<ApplicationUser, MongoIdentityRole, System.Guid>(mongoSettings["ConnectionString"], mongoSettings["IdentityDb"])
        .AddDefaultTokenProviders();
    }

    public static void SetupAuthentication(this WebApplicationBuilder builder, ConfigurationManager configuration)
    {
        IConfigurationSection jwtSettings = configuration.GetSection("JwtSettings");

        var key = Encoding.ASCII.GetBytes(jwtSettings["Secret"]);

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
    }
}
