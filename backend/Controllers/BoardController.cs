using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BoardController : ControllerBase
{
    private readonly BoardService _boardService;

    public BoardController(BoardService boardService)
    {
        _boardService = boardService;
    }

    [HttpPost("create")]    
    public IActionResult CreateBoard()
    {
        var boardId = _boardService.CreateBoard();
        return Ok(new { boardId });
    }

    [HttpGet("{boardId}")]
    public IActionResult GetBoard(string boardId)
    {
        var board = _boardService.GetBoard(boardId);
        if (board == null)
        {
            return NotFound();
        }

        return Ok(board);
    }

    [HttpPost("{boardId}/chat")]
    public IActionResult AddChatMessage(string boardId, [FromBody] ChatMessage message)
    {
        _boardService.AddChatMessage(boardId, message);
        return Ok();
    }

    [HttpPost("{boardId}/drawing")]
    public IActionResult AddDrawing(string boardId, [FromBody] Drawing drawing)
    {
        _boardService.AddDrawing(boardId, drawing);
        return Ok();
    }
}
