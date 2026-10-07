import com.sun.net.httpserver.HttpExchange;
import com.sun.net.httpserver.HttpServer;

import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.InetSocketAddress;
import java.nio.charset.StandardCharsets;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.ArrayList;
import java.util.List;

public class MedicalServer
{
    static String url =
        "jdbc:mysql://localhost:3306/medical_assistance";

    static String username = "root";
    static String password = "";

    public static void main(String[] args)
    {
        try
        {
            Class.forName("com.mysql.cj.jdbc.Driver");

            Connection test =
                DriverManager.getConnection(
                    url,
                    username,
                    password
                );

            System.out.println(
                "Connected to database successfully!"
            );

            test.close();

            HttpServer server =
                HttpServer.create(
                    new InetSocketAddress(8080),
                    0
                );

            // Patient registration
            server.createContext(
                "/registerPatient",
                MedicalServer::handleRegisterPatient
            );

            // Patient login
            server.createContext(
                "/loginPatient",
                MedicalServer::handleLoginPatient
            );

            // Symptom matching
            server.createContext(
                "/symptoms",
                MedicalServer::handleSymptoms
            );

            // Get available slots
            server.createContext(
                "/slots",
                MedicalServer::handleSlots
            );

            // Book appointment
            server.createContext(
                "/bookAppointment",
                MedicalServer::handleBookAppointment
            );

            // View patient's appointments
            server.createContext(
                "/myAppointment",
                MedicalServer::handleMyAppointment
            );

            server.setExecutor(null);

            server.start();

            System.out.println();
            System.out.println(
                "Medical Server started."
            );

            System.out.println(
                "Server URL: http://localhost:8080"
            );

            System.out.println(
                "Waiting for requests from website..."
            );
        }
        catch (Exception e)
        {
            System.out.println(
                "Server error!"
            );

            e.printStackTrace();
        }
    }


    // =========================================================
    // PATIENT REGISTRATION
    // =========================================================

    public static void handleRegisterPatient(
        HttpExchange exchange
    ) throws IOException
    {
        addCorsHeaders(exchange);

        if (exchange.getRequestMethod().equals("OPTIONS"))
        {
            exchange.sendResponseHeaders(
                204,
                -1
            );

            return;
        }

        if (!exchange.getRequestMethod().equals("POST"))
        {
            sendResponse(
                exchange,
                "{\"error\":\"Only POST request is allowed.\"}"
            );

            return;
        }

        Connection con = null;

        try
        {
            InputStream input =
                exchange.getRequestBody();

            String inputText =
                new String(
                    input.readAllBytes(),
                    StandardCharsets.UTF_8
                );

            /*
             * Format:
             *
             * name|loginId|password|email|phone|familyName|familyPhone
             */

            String[] values =
                inputText.split(
                    "\\|",
                    -1
                );

            if (values.length != 7)
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Invalid registration data.\"}"
                );

                return;
            }

            String name =
                values[0].trim();

            String loginId =
                values[1].trim();

            String patientPassword =
                values[2].trim();

            String email =
                values[3].trim();

            String phone =
                values[4].trim();

            String familyName =
                values[5].trim();

            String familyPhone =
                values[6].trim();

            if (
                name.isEmpty() ||
                loginId.isEmpty() ||
                patientPassword.isEmpty() ||
                email.isEmpty() ||
                phone.isEmpty()
            )
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Please fill all required fields.\"}"
                );

                return;
            }

            System.out.println();
            System.out.println(
                "New patient registration..."
            );

            System.out.println(
                "Name: " + name
            );

            System.out.println(
                "Login ID: " + loginId
            );

            con =
                DriverManager.getConnection(
                    url,
                    username,
                    password
                );

            // Check duplicate login ID

            String checkQuery =
                "SELECT patient_id " +
                "FROM patient " +
                "WHERE login_id = ?";

            PreparedStatement checkPst =
                con.prepareStatement(
                    checkQuery
                );

            checkPst.setString(
                1,
                loginId
            );

            ResultSet checkRs =
                checkPst.executeQuery();

            if (checkRs.next())
            {
                checkRs.close();
                checkPst.close();
                con.close();

                sendResponse(
                    exchange,
                    "{\"error\":\"Login ID already exists. Please choose another login ID.\"}"
                );

                return;
            }

            checkRs.close();
            checkPst.close();

            // Insert patient

            String insertQuery =
                "INSERT INTO patient " +
                "(name, login_id, password, email, phone, family_name, family_phone) " +
                "VALUES (?, ?, ?, ?, ?, ?, ?)";

            PreparedStatement insertPst =
                con.prepareStatement(
                    insertQuery,
                    java.sql.Statement.RETURN_GENERATED_KEYS
                );

            insertPst.setString(
                1,
                name
            );

            insertPst.setString(
                2,
                loginId
            );

            insertPst.setString(
                3,
                patientPassword
            );

            insertPst.setString(
                4,
                email
            );

            insertPst.setString(
                5,
                phone
            );

            insertPst.setString(
                6,
                familyName
            );

            insertPst.setString(
                7,
                familyPhone
            );

            insertPst.executeUpdate();

            // Get generated patient ID

            int patientId = 0;

            ResultSet generatedKeys =
                insertPst.getGeneratedKeys();

            if (generatedKeys.next())
            {
                patientId =
                    generatedKeys.getInt(1);
            }

            generatedKeys.close();
            insertPst.close();
            con.close();

            System.out.println(
                "Patient registered successfully!"
            );

            System.out.println(
                "Patient ID: " + patientId
            );

            String response =
                "{"
                + "\"success\":true,"
                + "\"message\":\"Registration successful.\","
                + "\"patientId\":"
                + patientId
                + "}";

            sendResponse(
                exchange,
                response
            );
        }
        catch (Exception e)
        {
            e.printStackTrace();

            try
            {
                if (con != null)
                {
                    con.close();
                }
            }
            catch (Exception ignored)
            {
            }

            sendResponse(
                exchange,
                "{\"error\":\"Could not register patient.\"}"
            );
        }
    }


    // =========================================================
    // PATIENT LOGIN
    // =========================================================

    public static void handleLoginPatient(
        HttpExchange exchange
    ) throws IOException
    {
        addCorsHeaders(exchange);

        if (exchange.getRequestMethod().equals("OPTIONS"))
        {
            exchange.sendResponseHeaders(
                204,
                -1
            );

            return;
        }

        if (!exchange.getRequestMethod().equals("POST"))
        {
            sendResponse(
                exchange,
                "{\"error\":\"Only POST request is allowed.\"}"
            );

            return;
        }

        Connection con = null;

        try
        {
            InputStream input =
                exchange.getRequestBody();

            String inputText =
                new String(
                    input.readAllBytes(),
                    StandardCharsets.UTF_8
                );

            /*
             * Format:
             *
             * loginId|password
             */

            String[] values =
                inputText.split(
                    "\\|",
                    -1
                );

            if (values.length != 2)
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Invalid login data.\"}"
                );

                return;
            }

            String loginId =
                values[0].trim();

            String patientPassword =
                values[1].trim();

            if (
                loginId.isEmpty() ||
                patientPassword.isEmpty()
            )
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Please enter Login ID and Password.\"}"
                );

                return;
            }

            System.out.println();
            System.out.println(
                "Patient login request..."
            );

            System.out.println(
                "Login ID: " + loginId
            );

            con =
                DriverManager.getConnection(
                    url,
                    username,
                    password
                );

            String query =
                "SELECT " +
                "patient_id, " +
                "name, " +
                "login_id, " +
                "email, " +
                "phone, " +
                "family_name, " +
                "family_phone " +
                "FROM patient " +
                "WHERE login_id = ? " +
                "AND password = ?";

            PreparedStatement pst =
                con.prepareStatement(
                    query
                );

            pst.setString(
                1,
                loginId
            );

            pst.setString(
                2,
                patientPassword
            );

            ResultSet rs =
                pst.executeQuery();

            if (!rs.next())
            {
                rs.close();
                pst.close();
                con.close();

                System.out.println(
                    "Login failed."
                );

                sendResponse(
                    exchange,
                    "{\"error\":\"Invalid Login ID or Password.\"}"
                );

                return;
            }

            int patientId =
                rs.getInt(
                    "patient_id"
                );

            String name =
                rs.getString(
                    "name"
                );

            String returnedLoginId =
                rs.getString(
                    "login_id"
                );

            String email =
                rs.getString(
                    "email"
                );

            String phone =
                rs.getString(
                    "phone"
                );

            String familyName =
                rs.getString(
                    "family_name"
                );

            String familyPhone =
                rs.getString(
                    "family_phone"
                );

            rs.close();
            pst.close();
            con.close();

            System.out.println(
                "Login successful!"
            );

            System.out.println(
                "Patient ID: " +
                patientId
            );

            String response =
                "{"
                + "\"success\":true,"
                + "\"message\":\"Login successful.\","
                + "\"patient_id\":"
                + patientId
                + ","
                + "\"name\":\""
                + escapeJson(name)
                + "\","
                + "\"login_id\":\""
                + escapeJson(returnedLoginId)
                + "\","
                + "\"email\":\""
                + escapeJson(email)
                + "\","
                + "\"phone\":\""
                + escapeJson(phone)
                + "\","
                + "\"family_name\":\""
                + escapeJson(familyName)
                + "\","
                + "\"family_phone\":\""
                + escapeJson(familyPhone)
                + "\""
                + "}";

            sendResponse(
                exchange,
                response
            );
        }
        catch (Exception e)
        {
            e.printStackTrace();

            try
            {
                if (con != null)
                {
                    con.close();
                }
            }
            catch (Exception ignored)
            {
            }

            sendResponse(
                exchange,
                "{\"error\":\"Could not login patient.\"}"
            );
        }
    }


    // =========================================================
    // SYMPTOM MATCHING
    // =========================================================

    public static void handleSymptoms(
        HttpExchange exchange
    ) throws IOException
    {
        addCorsHeaders(exchange);

        if (exchange.getRequestMethod().equals("OPTIONS"))
        {
            exchange.sendResponseHeaders(
                204,
                -1
            );

            return;
        }

        if (!exchange.getRequestMethod().equals("POST"))
        {
            sendResponse(
                exchange,
                "{\"error\":\"Only POST request is allowed.\"}"
            );

            return;
        }

        try
        {
            InputStream input =
                exchange.getRequestBody();

            String inputText =
                new String(
                    input.readAllBytes(),
                    StandardCharsets.UTF_8
                );

            System.out.println();
            System.out.println(
                "Symptoms received: " + inputText
            );

            if (inputText.trim().isEmpty())
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Please select at least one symptom.\"}"
                );

                return;
            }

            String[] symptomValues;

            /*
             * Accept:
             *
             * 1,2,3
             *
             * OR
             *
             * 1 2 3
             */

            if (inputText.contains(","))
            {
                symptomValues =
                    inputText.split(",");
            }
            else
            {
                symptomValues =
                    inputText.trim().split("\\s+");
            }

            List<Integer> symptomIds =
                new ArrayList<>();

            for (String value : symptomValues)
            {
                try
                {
                    symptomIds.add(
                        Integer.parseInt(
                            value.trim()
                        )
                    );
                }
                catch (NumberFormatException e)
                {
                    // Ignore invalid values
                }
            }

            if (symptomIds.size() == 0)
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Invalid symptom selection.\"}"
                );

                return;
            }

            StringBuilder placeholders =
                new StringBuilder();

            for (
                int i = 0;
                i < symptomIds.size();
                i++
            )
            {
                placeholders.append("?");

                if (
                    i < symptomIds.size() - 1
                )
                {
                    placeholders.append(",");
                }
            }

            String query =
                "SELECT " +
                "d.doctor_id, " +
                "sp.specialization_name, " +
                "d.name AS doctor_name, " +
                "COUNT(*) AS matches " +
                "FROM Symptom_Specialization ss " +
                "JOIN Specialization sp " +
                "ON ss.specialization_id = sp.specialization_id " +
                "JOIN Doctor d " +
                "ON sp.specialization_id = d.specialization_id " +
                "WHERE ss.symptom_id IN (" +
                placeholders.toString() +
                ") " +
                "GROUP BY " +
                "d.doctor_id, " +
                "sp.specialization_name, " +
                "d.name " +
                "ORDER BY matches DESC";

            Connection con =
                DriverManager.getConnection(
                    url,
                    username,
                    password
                );

            PreparedStatement pst =
                con.prepareStatement(
                    query
                );

            for (
                int i = 0;
                i < symptomIds.size();
                i++
            )
            {
                pst.setInt(
                    i + 1,
                    symptomIds.get(i)
                );
            }

            ResultSet rs =
                pst.executeQuery();

            StringBuilder json =
                new StringBuilder();

            json.append("[");

            boolean first = true;

            while (rs.next())
            {
                if (!first)
                {
                    json.append(",");
                }

                first = false;

                int doctorId =
                    rs.getInt(
                        "doctor_id"
                    );

                String specialization =
                    rs.getString(
                        "specialization_name"
                    );

                String doctor =
                    rs.getString(
                        "doctor_name"
                    );

                int matches =
                    rs.getInt(
                        "matches"
                    );

                json.append("{");

                json.append(
                    "\"specialist\":\""
                );

                json.append(
                    escapeJson(
                        specialization
                    )
                );

                json.append("\",");

                json.append(
                    "\"doctor\":\""
                );

                json.append(
                    escapeJson(
                        doctor
                    )
                );

                json.append("\",");

                json.append(
                    "\"doctorId\":"
                );

                json.append(
                    doctorId
                );

                json.append(",");

                json.append(
                    "\"matches\":"
                );

                json.append(
                    matches
                );

                json.append("}");
            }

            json.append("]");

            rs.close();
            pst.close();
            con.close();

            System.out.println(
                "Response sent: " +
                json.toString()
            );

            sendResponse(
                exchange,
                json.toString()
            );
        }
        catch (Exception e)
        {
            e.printStackTrace();

            sendResponse(
                exchange,
                "{\"error\":\"Database error occurred.\"}"
            );
        }
    }


    // =========================================================
    // GET AVAILABLE SLOTS
    // =========================================================

    public static void handleSlots(
        HttpExchange exchange
    ) throws IOException
    {
        addCorsHeaders(exchange);

        if (exchange.getRequestMethod().equals("OPTIONS"))
        {
            exchange.sendResponseHeaders(
                204,
                -1
            );

            return;
        }

        if (!exchange.getRequestMethod().equals("POST"))
        {
            sendResponse(
                exchange,
                "{\"error\":\"Only POST request is allowed.\"}"
            );

            return;
        }

        try
        {
            InputStream input =
                exchange.getRequestBody();

            String inputText =
                new String(
                    input.readAllBytes(),
                    StandardCharsets.UTF_8
                );

            int doctorId =
                Integer.parseInt(
                    inputText.trim()
                );

            System.out.println();

            System.out.println(
                "Getting slots for doctor: " +
                doctorId
            );

            String query =
                "SELECT slot_id, slot_time, slot_date " +
                "FROM doctor_timeslot " +
                "WHERE doctor_id = ? " +
                "AND is_available = 1 " +
                "AND slot_date >= CURDATE() " +
                "ORDER BY slot_date, slot_time";

            Connection con =
                DriverManager.getConnection(
                    url,
                    username,
                    password
                );

            PreparedStatement pst =
                con.prepareStatement(
                    query
                );

            pst.setInt(
                1,
                doctorId
            );

            ResultSet rs =
                pst.executeQuery();

            StringBuilder json =
                new StringBuilder();

            json.append("[");

            boolean first = true;

            while (rs.next())
            {
                if (!first)
                {
                    json.append(",");
                }

                first = false;

                int slotId =
                    rs.getInt(
                        "slot_id"
                    );

                String slotTime =
                    rs.getString(
                        "slot_time"
                    );

                String slotDate =
                    rs.getString(
                        "slot_date"
                    );

                json.append("{");

                json.append(
                    "\"slotId\":"
                );

                json.append(
                    slotId
                );

                json.append(",");

                json.append(
                    "\"slotTime\":\""
                );

                json.append(
                    escapeJson(
                        slotTime
                    )
                );

                json.append("\",");

                json.append(
                    "\"slotDate\":\""
                );

                json.append(
                    escapeJson(
                        slotDate
                    )
                );

                json.append("\"");

                json.append("}");
            }

            json.append("]");

            rs.close();
            pst.close();
            con.close();

            System.out.println(
                "Available slots sent: " +
                json.toString()
            );

            sendResponse(
                exchange,
                json.toString()
            );
        }
        catch (Exception e)
        {
            e.printStackTrace();

            sendResponse(
                exchange,
                "{\"error\":\"Could not get available slots.\"}"
            );
        }
    }


    // =========================================================
    // BOOK APPOINTMENT
    // =========================================================

    public static void handleBookAppointment(
        HttpExchange exchange
    ) throws IOException
    {
        addCorsHeaders(exchange);

        if (exchange.getRequestMethod().equals("OPTIONS"))
        {
            exchange.sendResponseHeaders(
                204,
                -1
            );

            return;
        }

        if (!exchange.getRequestMethod().equals("POST"))
        {
            sendResponse(
                exchange,
                "{\"error\":\"Only POST request is allowed.\"}"
            );

            return;
        }

        Connection con = null;

        try
        {
            InputStream input =
                exchange.getRequestBody();

            String inputText =
                new String(
                    input.readAllBytes(),
                    StandardCharsets.UTF_8
                );

            /*
             * Format:
             *
             * patientId|doctorId|slotId
             */

            String[] values =
                inputText.split(
                    "\\|"
                );

            if (values.length != 3)
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Invalid booking data.\"}"
                );

                return;
            }

            int patientId =
                Integer.parseInt(
                    values[0].trim()
                );

            int doctorId =
                Integer.parseInt(
                    values[1].trim()
                );

            int slotId =
                Integer.parseInt(
                    values[2].trim()
                );

            System.out.println();

            System.out.println(
                "Booking appointment..."
            );

            System.out.println(
                "Patient ID: " +
                patientId
            );

            System.out.println(
                "Doctor ID: " +
                doctorId
            );

            System.out.println(
                "Slot ID: " +
                slotId
            );

            con =
                DriverManager.getConnection(
                    url,
                    username,
                    password
                );

            // Check slot

            String checkQuery =
                "SELECT doctor_id, is_available " +
                "FROM doctor_timeslot " +
                "WHERE slot_id = ?";

            PreparedStatement checkPst =
                con.prepareStatement(
                    checkQuery
                );

            checkPst.setInt(
                1,
                slotId
            );

            ResultSet checkRs =
                checkPst.executeQuery();

            if (!checkRs.next())
            {
                checkRs.close();
                checkPst.close();

                sendResponse(
                    exchange,
                    "{\"error\":\"Selected slot does not exist.\"}"
                );

                con.close();

                return;
            }

            int slotDoctorId =
                checkRs.getInt(
                    "doctor_id"
                );

            int available =
                checkRs.getInt(
                    "is_available"
                );

            checkRs.close();
            checkPst.close();

            if (
                slotDoctorId != doctorId
            )
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"This slot does not belong to the selected doctor.\"}"
                );

                con.close();

                return;
            }

            if (
                available != 1
            )
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"This slot is no longer available.\"}"
                );

                con.close();

                return;
            }

            // Generate receipt

            String receiptNumber =
                "REC" +
                System.currentTimeMillis();

            // Insert appointment

            String insertQuery =
                "INSERT INTO Appointment " +
                "(patient_id, doctor_id, slot_id, status, receipt_number) " +
                "VALUES (?, ?, ?, ?, ?)";

            PreparedStatement insertPst =
                con.prepareStatement(
                    insertQuery
                );

            insertPst.setInt(
                1,
                patientId
            );

            insertPst.setInt(
                2,
                doctorId
            );

            insertPst.setInt(
                3,
                slotId
            );

            insertPst.setString(
                4,
                "Booked"
            );

            insertPst.setString(
                5,
                receiptNumber
            );

            insertPst.executeUpdate();

            insertPst.close();

            // Mark slot unavailable

            String updateQuery =
                "UPDATE doctor_timeslot " +
                "SET is_available = 0 " +
                "WHERE slot_id = ?";

            PreparedStatement updatePst =
                con.prepareStatement(
                    updateQuery
                );

            updatePst.setInt(
                1,
                slotId
            );

            updatePst.executeUpdate();

            updatePst.close();

            con.close();

            System.out.println(
                "Appointment booked successfully!"
            );

            System.out.println(
                "Receipt Number: " +
                receiptNumber
            );

            String response =
                "{"
                + "\"success\":true,"
                + "\"message\":\"Appointment booked successfully.\","
                + "\"receiptNumber\":\""
                + receiptNumber
                + "\""
                + "}";

            sendResponse(
                exchange,
                response
            );
        }
        catch (Exception e)
        {
            e.printStackTrace();

            try
            {
                if (con != null)
                {
                    con.close();
                }
            }
            catch (Exception ignored)
            {
            }

            sendResponse(
                exchange,
                "{\"error\":\"Could not book appointment.\"}"
            );
        }
    }


    // =========================================================
    // MY APPOINTMENT
    // =========================================================

    public static void handleMyAppointment(
        HttpExchange exchange
    ) throws IOException
    {
        addCorsHeaders(exchange);

        if (exchange.getRequestMethod().equals("OPTIONS"))
        {
            exchange.sendResponseHeaders(
                204,
                -1
            );

            return;
        }

        if (!exchange.getRequestMethod().equals("POST"))
        {
            sendResponse(
                exchange,
                "{\"error\":\"Only POST request is allowed.\"}"
            );

            return;
        }

        try
        {
            InputStream input =
                exchange.getRequestBody();

            String inputText =
                new String(
                    input.readAllBytes(),
                    StandardCharsets.UTF_8
                );

            if (inputText.trim().isEmpty())
            {
                sendResponse(
                    exchange,
                    "{\"error\":\"Patient ID is required.\"}"
                );

                return;
            }

            int patientId =
                Integer.parseInt(
                    inputText.trim()
                );

            System.out.println();

            System.out.println(
                "Getting appointment for patient: " +
                patientId
            );

            String query =
                "SELECT " +
                "a.appointment_id, " +
                "a.status, " +
                "a.receipt_number, " +
                "d.name AS doctor_name, " +
                "sp.specialization_name, " +
                "ts.slot_date, " +
                "ts.slot_time " +
                "FROM Appointment a " +
                "JOIN Doctor d " +
                "ON a.doctor_id = d.doctor_id " +
                "JOIN Specialization sp " +
                "ON d.specialization_id = sp.specialization_id " +
                "JOIN doctor_timeslot ts " +
                "ON a.slot_id = ts.slot_id " +
                "WHERE a.patient_id = ? " +
                "ORDER BY a.appointment_id DESC";

            Connection con =
                DriverManager.getConnection(
                    url,
                    username,
                    password
                );

            PreparedStatement pst =
                con.prepareStatement(
                    query
                );

            pst.setInt(
                1,
                patientId
            );

            ResultSet rs =
                pst.executeQuery();

            StringBuilder json =
                new StringBuilder();

            json.append("[");

            boolean first = true;

            while (rs.next())
            {
                if (!first)
                {
                    json.append(",");
                }

                first = false;

                int appointmentId =
                    rs.getInt(
                        "appointment_id"
                    );

                String status =
                    rs.getString(
                        "status"
                    );

                String receiptNumber =
                    rs.getString(
                        "receipt_number"
                    );

                String doctorName =
                    rs.getString(
                        "doctor_name"
                    );

                String specialization =
                    rs.getString(
                        "specialization_name"
                    );

                String slotDate =
                    rs.getString(
                        "slot_date"
                    );

                String slotTime =
                    rs.getString(
                        "slot_time"
                    );

                json.append("{");

                json.append(
                    "\"appointmentId\":"
                );

                json.append(
                    appointmentId
                );

                json.append(",");

                json.append(
                    "\"doctor\":\""
                );

                json.append(
                    escapeJson(
                        doctorName
                    )
                );

                json.append("\",");

                json.append(
                    "\"specialist\":\""
                );

                json.append(
                    escapeJson(
                        specialization
                    )
                );

                json.append("\",");

                json.append(
                    "\"date\":\""
                );

                json.append(
                    escapeJson(
                        slotDate
                    )
                );

                json.append("\",");

                json.append(
                    "\"time\":\""
                );

                json.append(
                    escapeJson(
                        slotTime
                    )
                );

                json.append("\",");

                json.append(
                    "\"status\":\""
                );

                json.append(
                    escapeJson(
                        status
                    )
                );

                json.append("\",");

                json.append(
                    "\"receiptNumber\":\""
                );

                json.append(
                    escapeJson(
                        receiptNumber
                    )
                );

                json.append("\"");

                json.append("}");
            }

            json.append("]");

            rs.close();
            pst.close();
            con.close();

            System.out.println(
                "Appointment details sent: " +
                json.toString()
            );

            sendResponse(
                exchange,
                json.toString()
            );
        }
        catch (Exception e)
        {
            e.printStackTrace();

            sendResponse(
                exchange,
                "{\"error\":\"Could not get appointment details.\"}"
            );
        }
    }


    // =========================================================
    // CORS
    // =========================================================

    public static void addCorsHeaders(
        HttpExchange exchange
    )
    {
        exchange.getResponseHeaders().add(
            "Access-Control-Allow-Origin",
            "*"
        );

        exchange.getResponseHeaders().add(
            "Access-Control-Allow-Headers",
            "Content-Type"
        );

        exchange.getResponseHeaders().add(
            "Access-Control-Allow-Methods",
            "POST, OPTIONS"
        );
    }


    // =========================================================
    // SEND RESPONSE
    // =========================================================

    public static void sendResponse(
        HttpExchange exchange,
        String response
    ) throws IOException
    {
        byte[] data =
            response.getBytes(
                StandardCharsets.UTF_8
            );

        exchange.getResponseHeaders().set(
            "Content-Type",
            "application/json"
        );

        exchange.sendResponseHeaders(
            200,
            data.length
        );

        OutputStream output =
            exchange.getResponseBody();

        output.write(data);

        output.close();
    }


    // =========================================================
    // ESCAPE JSON
    // =========================================================

    public static String escapeJson(
        String text
    )
    {
        if (text == null)
        {
            return "";
        }

        return text
            .replace(
                "\\",
                "\\\\"
            )
            .replace(
                "\"",
                "\\\""
            );
    }
}