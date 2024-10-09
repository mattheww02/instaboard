using System.Collections.Generic;

public class Board
{
    public string Id { get; }
    public List<Drawing> Drawings { get; set; } = new List<Drawing>();
    public List<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();

    public Board(string Id) { this.Id = Id; }
}

public class Drawing
{
    public string Type { get; } = "drawing";
    public string UserId { get; set; }
    public List<Coordinate> Coordinates { get; set; }
    //TODO: add more properties e.g. color, stroke width
}

public class ChatMessage
{
    public string Type { get; } = "chat";
    public string UserId { get; set; }
    public string Message { get; set; }
    //TODO: add more properties e.g. date/time sent
}

public class Coordinate
{
    public float X { get; set; }
    public float Y { get; set; }
}
