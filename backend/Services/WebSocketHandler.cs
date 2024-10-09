using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using static Backend.Startup;

public class WebSocketHandler
{
    private readonly BoardService _boardService;

    public WebSocketHandler(BoardService boardService)
    {
        _boardService = boardService;
    }

    public async Task HandleWebSocketAsync(WebSocket webSocket, string boardId)
    {
        BoardClient client = new BoardClient(webSocket, ""); //TODO: set username here ?
        _boardService.AddClient(boardId, client);
        var buffer = new byte[1024 * 4];
        WebSocketReceiveResult result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);

        while (!result.CloseStatus.HasValue)
        {
            var message = Encoding.UTF8.GetString(buffer, 0, result.Count);
            var jsonDocument = JsonDocument.Parse(message);
            var messageType = jsonDocument.RootElement.GetProperty("type").GetString(); //TODO: use TryGetProperty instead

            if (messageType == "chat"
                || messageType == "drawing"
                || messageType == "startDrawing"
                || messageType == "clearBoard")
            {
                await BroadcastToBoardClientsAsync(boardId, message);
            }
            else {
                Console.WriteLine("Unknown message type");
            }
        
            result = await webSocket.ReceiveAsync(new ArraySegment<byte>(buffer), CancellationToken.None);
        }
        _boardService.RemoveClient(boardId, client);
        await webSocket.CloseAsync(result.CloseStatus.Value, result.CloseStatusDescription, CancellationToken.None);
    }

    private async Task BroadcastToBoardClientsAsync(string boardId, string message)
    {
        var clients = _boardService.GetBoardClients(boardId);

        foreach (var client in clients)
        {
            if (client.Socket.State == WebSocketState.Open)
            {
                var messageBuffer = Encoding.UTF8.GetBytes(message);
                await client.Socket.SendAsync(new ArraySegment<byte>(messageBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
            }
        }
    }
}

