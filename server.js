const http = require("http");
const fs = require("fs");
const path = require("path");
const sql = require("mssql/msnodesqlv8");

const config = {
  connectionString:
    "Driver={ODBC Driver 18 for SQL Server};" +
    "Server=localhost\\SQLEXPRESS;" +
    "Database=MyDatabase;" +
    "Trusted_Connection=Yes;" +
    "TrustServerCertificate=Yes;",
  connectionTimeout: 5000
};

// TEST SQL SERVER CONNECTION
(async () => {
  try {
    await sql.connect(config);
    console.log("Connected to SQL Server successfully!");
  } catch (error) {
    console.error("SQL Server connection error:");
    console.error(error);
  }
})();

const server = http.createServer((req, res) => {

  // LOGIN REQUEST
  if (req.url === "/login" && req.method === "POST") {
    let body = "";

    req.on("data", chunk => {
      body += chunk;
    });

    req.on("end", async () => {
      try {
        const data = JSON.parse(body);

        console.log("Login attempt:", data.username);

        const pool = await sql.connect(config);

        const result = await pool.request()
          .input("username", sql.VarChar, data.username)
          .input("password", sql.VarChar, data.password)
          .query(
            "SELECT * FROM Users WHERE username = @username AND password = @password"
          );

        if (result.recordset.length > 0) {
          res.writeHead(200, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify({
            message: "Login successful! 🎉"
          }));
        } else {
          res.writeHead(401, {
            "Content-Type": "application/json"
          });

          res.end(JSON.stringify({
            message: "Invalid username or password."
          }));
        }

      } catch (error) {
        console.error("Database error:", error);

        res.writeHead(500, {
          "Content-Type": "application/json"
        });

        res.end(JSON.stringify({
          message: "Server error."
        }));
      }
    });

    return;
  }

  // SERVE WEBSITE FILES
  let filePath;

  if (req.url === "/") {
  filePath = path.join(__dirname, "index.html");
} else {
  filePath = path.join(__dirname, req.url.slice(1));
}

  const ext = path.extname(filePath);

  const contentTypes = {
    ".html": "text/html",
    ".css": "text/css",
    ".js": "text/javascript"
  };

    console.log("Requested URL:", req.url);
    console.log("Trying to open:", filePath);

  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }

    res.writeHead(200, {
      "Content-Type": contentTypes[ext] || "text/plain"
    });

    res.end(data);
  });
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});