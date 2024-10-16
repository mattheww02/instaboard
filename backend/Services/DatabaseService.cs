using System.Threading.Tasks;
using Npgsql;

public class DatabaseService {
    public async Task InitDatabaseAsync() {
        var con = new NpgsqlConnection(
            connectionString: "Server=localhost;Port=5432;User Id=postgres;Password=passw0rd;Database=testdb;"
        );
        con.Open();

        using var cmd = new NpgsqlCommand();
        cmd.Connection = con;

        cmd.CommandText= 
            @"CREATE TABLE boards (
            id TEXT PRIMARY KEY,
            image_url TEXT UNIQUE
            )";
        await cmd.ExecuteNonQueryAsync();

        cmd.CommandText= 
            @"CREATE TABLE chats (
            id TEXT PRIMARY KEY,
            board_id TEXT NOT NULL,
            username TEXT NOT NULL,
            message TEXT NOT NULL,
            time_sent TIMESTAMP DEFAULT NOW(),
            CONSTRAINT fk_board
                FOREIGN KEY(board_id)
                REFERENCES boards(id)
            )";
        await cmd.ExecuteNonQueryAsync();
    }
}   