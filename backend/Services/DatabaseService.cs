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

        cmd.CommandText = $"DROP TABLE IF EXISTS boards";
        await cmd.ExecuteNonQueryAsync();

        cmd.CommandText= 
            @"CREATE TABLE boards (
            id VARCHAR(255) PRIMARY KEY
            )";
        await cmd.ExecuteNonQueryAsync();
    }
}   