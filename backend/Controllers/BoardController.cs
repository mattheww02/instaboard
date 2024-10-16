using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class BoardController : ControllerBase {
    private readonly BoardService _boardService;

    public BoardController(BoardService boardService) {
        _boardService = boardService;
    }

    [HttpPost("create")]    
    public IActionResult CreateBoard() {
        var boardId = _boardService.CreateBoard();
        return Ok(new { boardId });
    }

    [HttpGet("{boardId}/join")]
    public IActionResult JoinBoard(String boardId) {
        //TODO: add client, send PNG for user to load canvas, send chats
        return Ok();
    }
}
