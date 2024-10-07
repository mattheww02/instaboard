using System.Collections.Generic;

public class Board
{
    public string Id { get; set; } // Unique ID for the board
    public List<Drawing> Drawings { get; set; } = new List<Drawing>(); // List of drawings
}

public class Drawing
{
    public string UserId { get; set; } // ID of the user who drew
    public List<Coordinate> Coordinates { get; set; } // List of coordinates for the drawing
    // You can add additional properties as needed (e.g., color, stroke width, etc.)
}

public class Coordinate
{
    public float X { get; set; } // X coordinate
    public float Y { get; set; } // Y coordinate
}