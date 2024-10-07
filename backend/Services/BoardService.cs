using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CrypticWizard.RandomWordGenerator;
using static CrypticWizard.RandomWordGenerator.WordGenerator;

public class BoardService
{
    private readonly Dictionary<string, Board> _boards = new Dictionary<string, Board>();

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
        var newBoard = new Board { Id = boardId };
        _boards[boardId] = newBoard;
        return boardId;
    }

    public Board GetBoard(string boardId)
    {
        _boards.TryGetValue(boardId, out var board);
        return board;
    }
}