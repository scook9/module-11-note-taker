const express = require("express");
const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const PORT = process.env.PORT || 3001; //needed for Heroku, || = or

const app = express();

//need uuid to select the specific notes, make id a key on the array of objects

//middleware
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

app.post("/api/notes", (req, res) => {
  //for each new note, create an object with id, title, text
  let database = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
  console.log(database);
  //let note = req.body; //this is title and text, still need id
  const newObj = {
    id: uuidv4(),
    title: req.body.title,
    text: req.body.text,
  };
  console.log(newObj);
  database.push(newObj);
  fs.writeFileSync("./db/db.json", JSON.stringify(database));
  res.json(database);
});

//return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/public/index.html"));
});

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
