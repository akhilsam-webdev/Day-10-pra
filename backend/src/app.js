const express = require("express");
const cors = require("cors");
const path = require("path");
const noteModel = require("./models/note.model");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, "../public")));

// 🔹 CREATE
app.post("/api/note", async (req, res) => {
  const { title, diss } = req.body;

  const note = await noteModel.create({
    title,
    diss,
  });

  res.status(201).json({
    msg: "note created suff....",
    note,
  });
});

// 🔹 GET ALL
app.get("/api/note", async (req, res) => {
  const note = await noteModel.find();
  res.status(200).json({
    msg: "fetched all notes",
    note,
  });
});

// 🔹 DELETE ONE
app.delete("/api/note/:id", async (req, res) => {
  const { id } = req.params;
  const deleteNote = await noteModel.findByIdAndDelete(id);
  res.status(200).json({
    msg: "selected note deleted suff",
    deleteNote,
  });
});

// 🔹 UPDATE PARTIAL
app.patch("/api/note/:id", async (req, res) => {
  const { id } = req.params;
  const { diss } = req.body;
  const updateNote = await noteModel.findByIdAndUpdate(id, { diss: diss });
  res.status(200).json({
    msg: "note diss updated",
    updateNote,
  });
});

// 🔹 UPDATE FULL
app.put("/api/note/:id", async (req, res) => {
  const { id } = req.params;
  const { title, diss } = req.body;

  const updateAll = await noteModel.findByIdAndUpdate(id, {
    title: title,
    diss: diss,
  });
  res.status(200).json({
    msg: "upgated all note",
    updateAll,
  });
});

// 🔹 DELETE ALL
app.delete("/api/note", async (req, res) => {
  await noteModel.deleteMany();
  res.status(200).json({
    msg: "all notes deleted suff",
  });
});

// 🔹 WILDCARD (SPA routing)
// app.use("*name", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "/public/index.html"));
// });

app.use((req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});


module.exports = app;

