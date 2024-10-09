using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.WebSockets;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;
using Microsoft.AspNetCore.WebSockets;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System.Text;
using System.Collections.Concurrent;
using System.Text.Json;

namespace Backend
{

public class ChatHub : Hub
{
    public async Task SendMessage(string user, string message)
    {
        await Clients.All.SendAsync("ReceiveMessage", user, message);
    }
}
public class Startup
{
    // thread safe dictionary tracks all active websockets
    private static ConcurrentDictionary<WebSocket, Task> _webSockets = new ConcurrentDictionary<WebSocket, Task>();

    public void ConfigureServices(IServiceCollection services)
    {
        services.AddControllers();

        services.AddSingleton<WebSocketHandler>();
        services.AddSingleton<BoardService, BoardService>();

        services.AddCors(options =>
        {
            options.AddPolicy("AllowAllOrigins", builder =>
            {
                builder.AllowAnyOrigin()
                    .AllowAnyMethod()
                    .AllowAnyHeader();
            });
        });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment()) {
            app.UseDeveloperExceptionPage();
        }

        app.UseWebSockets();

        app.Use(async (context, next) => {
            if (context.Request.Path.StartsWithSegments("/ws")) {
                if (context.WebSockets.IsWebSocketRequest) {
                    var webSocket = await context.WebSockets.AcceptWebSocketAsync();
                    var webSocketHandler = app.ApplicationServices.GetRequiredService<WebSocketHandler>();
                    var boardId = context.Request.Query["boardId"];
                    await webSocketHandler.HandleWebSocketAsync(webSocket, boardId);//HandleWebSocketConnection(webSocket);
                }
                else {
                    context.Response.StatusCode = 400;
                }
            }
            else {
                await next();
            }
        });

        app.UseCors("AllowAllOrigins");

            app.UseRouting();

        app.UseEndpoints(endpoints => {
            endpoints.MapControllers();
        });
    }
}
}

