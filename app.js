// Initial imports
const express = require("express");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("./public"));

// Middleware to serve HTML
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "register-page.html"));
});

// Server start
app.listen(
  {
    port: port,
    host: "0.0.0.0",
  },
  () => {
    console.log("Server running on the port ", port);
  }
);
