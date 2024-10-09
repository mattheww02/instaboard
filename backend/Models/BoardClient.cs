using System.Net.WebSockets;

public class BoardClient {
    public WebSocket Socket { get; set; }
    public string Username { get; set; }

    public BoardClient(WebSocket socket, string username)
    {
        Socket = socket;
        Username = username;
    }
}