using System.Collections.Generic;

public class Board
{
    public string Id { get; }
    public (float, float) Size { get; }
    public List<Drawing> Drawings { get; set; } = new List<Drawing>();
    public List<ChatMessage> ChatMessages { get; set; } = new List<ChatMessage>();

    public Board(string id, (float, float) size) { 
        this.Id = id;
        this.Size = size;
    }
    public Board(string id, float width, float height) { 
        this.Id = id;
        this.Size = (width, height);
    }

}

public class Drawing
{
    public string Type { get; } = "drawing";
    public string UserId { get; set; }
    public List<(float, float)> Coordinates { get; set; }
    //TODO: add more properties e.g. color, stroke width
}

public class ChatMessage
{
    public string Type { get; } = "chat";
    public string UserId { get; set; }
    public string Message { get; set; }
    //TODO: add more properties e.g. date/time sent
}
