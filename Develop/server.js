const express = require("express");
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//return notes.html
app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

//get notes
app.get("/api/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "/db/db.json"));
});

//return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.post("/api/notes", (req, res) => {
  let database = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  let note = req.body;
  database.push(note);
  fs.writeFileSync("./db/db.json", JSON.stringify(database));
  res.json(database);
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
