using System;
using System.Collections.Generic;
using System.Net.WebSockets;
using System.Threading.Tasks;
using CrypticWizard.RandomWordGenerator;
using static CrypticWizard.RandomWordGenerator.WordGenerator;

public class BoardService
{
    private readonly Dictionary<string, Board> _boards = new Dictionary<string, Board>();
    private readonly Dictionary<string, List<BoardClient>> _clients = new Dictionary<string, List<BoardClient>>();

    private string GenerateBoardId()
    {
        WordGenerator wGen = new WordGenerator();
        List<PartOfSpeech> pattern = new List<PartOfSpeech>{
            PartOfSpeech.adj, 
            PartOfSpeech.adj, 
            PartOfSpeech.noun
        };
        return wGen.GetPatterns(pattern, '-', 1)[0];
    }

    public string CreateBoard()
    {
        var boardId = GenerateBoardId();
        var newBoard = new Board(boardId);
        _boards[boardId] = newBoard;
        return boardId;
    }

    public Board GetBoard(string boardId)
    {
        _boards.TryGetValue(boardId, out var board);
        return board;
    }

    public void AddClient(string boardId, BoardClient client)
    {
        if (!_clients.ContainsKey(boardId)) { //TODO: fix key is null
            _clients[boardId] = new List<BoardClient>();
        }
        _clients[boardId].Add(client);
    }

    public void RemoveClient(string boardId, BoardClient client)
    {
        if (_clients.ContainsKey(boardId)) {
            _clients[boardId].Remove(client);
            if (_clients[boardId].Count == 0) {
                _clients.Remove(boardId);
            }
        }
    }

    public List<BoardClient> GetBoardClients(string boardId) {
        return _clients.GetValueOrDefault(boardId, new List<BoardClient>());
    }

    public void AddChatMessage(string boardId, ChatMessage message)
    {
        var board = GetBoard(boardId);
        board.ChatMessages.Add(message);
    }

    public void AddDrawing(string boardId, Drawing drawing)
    {
        var board = GetBoard(boardId);
        board.Drawings.Add(drawing);
    }
}