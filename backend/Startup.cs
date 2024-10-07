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

        services.AddScoped<BoardService, BoardService>();

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
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
        }

        app.UseWebSockets();

        app.Use(async (context, next) =>
        {
            if (context.WebSockets.IsWebSocketRequest)
            {
                WebSocket webSocket = await context.WebSockets.AcceptWebSocketAsync();
                await HandleWebSocketConnection(webSocket);
            }
            else
            {
                await next();
            }
        });

        app.UseCors("AllowAllOrigins");

            app.UseRouting();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
        });
    }

    public class MessageModel
    {
        public string type { get; set; }
        public string username { get; set; }
        public string message { get; set; }
        public Coordinates coordinates { get; set; }
    }
    public class Coordinates
    {
        public float x { get; set; }
        public float y { get; set; }
    }

    private async Task HandleWebSocketConnection(WebSocket webSocket)
    {
        // websocket to list of actives
        _webSockets.TryAdd(webSocket, Task.CompletedTask);

        byte[] buffer = new byte[1024 * 4];
        WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

        while (!result.CloseStatus.HasValue)
        {
            string message = Encoding.UTF8.GetString(buffer, 0, result.Count);

            var messageObject = JsonSerializer.Deserialize<MessageModel>(message);

            if (messageObject.type == "chat" 
             || messageObject.type == "drawing" 
             || messageObject.type == "startDrawing" ) {
                // broadcast message to all connected clients
                await BroadcastMessageAsync(message); 
            }
            else
            {
                Console.WriteLine("Unknown message type");
            }
            // wait for next message
            result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        }

        _webSockets.TryRemove(webSocket, out _);

        await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    }

    private async Task BroadcastMessageAsync(string message)
    {
        byte[] messageBuffer = Encoding.UTF8.GetBytes(message);
        var tasks = new List<Task>();

        foreach (var webSocketPair in _webSockets)
        {
            WebSocket webSocket = webSocketPair.Key;

            if (webSocket.State == WebSocketState.Open)
            {
                tasks.Add(webSocket.SendAsync(
                    new ArraySegment<byte>(messageBuffer, 0, messageBuffer.Length),
                    WebSocketMessageType.Text,
                    true,
                    CancellationToken.None));
            }
        }

        // wait for all send tasks to complete
        await Task.WhenAll(tasks);
    }
}
}

