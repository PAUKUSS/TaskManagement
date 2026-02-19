using Microsoft.AspNetCore.Builder;
using Yarp.ReverseProxy;

var builder = WebApplication.CreateBuilder(args);

// Allow the UI app (TaskManagerUI) to call the gateway from a different origin during local dev.
builder.Services.AddCors(options =>
{
    options.AddPolicy("UiCors", policy =>
        policy
            .WithOrigins("http://localhost:5034", "https://localhost:7250")
            .AllowAnyHeader()
            .AllowAnyMethod());
});

builder.Services.AddReverseProxy()
    .LoadFromConfig(builder.Configuration.GetSection("ReverseProxy"));

//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseCors("UiCors");

//app.UseSwagger();
//app.UseSwaggerUI();

app.MapReverseProxy();

app.Run();
