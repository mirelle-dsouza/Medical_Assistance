import java.sql.Connection;
import java.sql.DriverManager;

public class DatabaseConnection
{
    public static void main(String[] args)
    {
        String url = "jdbc:mysql://localhost:3306/medical_assistance";
        String username = "root";
        String password = "";

        try
        {
            Connection con = DriverManager.getConnection(
                url, username, password
            );

            System.out.println("Connected to database successfully!");

            con.close();
        }
        catch (Exception e)
        {
            System.out.println("Database connection failed!");
            System.out.println(e);
        }
    }
}