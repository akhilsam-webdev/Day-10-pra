import axios from "axios";
import { useEffect, useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [diss, setDiss] = useState("");
  const [editId, setEditId] = useState(null);

  // 🔹 Fetch Notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    axios
      .get("/api/note")
      .then((res) => {
        setNotes(res.data.note);
      })
      .catch((err) => console.log(err));
  };

  // 🔹 Create + Update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      // UPDATE
      axios
        .put(`/api/note/${editId}`, {
          title,
          diss,
        })
        .then(() => {
          fetchNotes();
          resetForm();
        })
        .catch((err) => console.log(err));
    } else {
      // CREATE
      axios
        .post("/api/note", {
          title,
          diss,
        })
        .then(() => {
          fetchNotes();
          resetForm();
        })
        .catch((err) => console.log(err));
    }
  };

  // 🔹 Delete
  const handleDelete = (id) => {
    axios
      .delete(`/api/note/${id}`)
      .then(() => fetchNotes())
      .catch((err) => console.log(err));
  };

  // 🔹 Edit Click → populate form
  const handleEditClick = (note) => {
    setTitle(note.title);
    setDiss(note.diss);
    setEditId(note._id);
  };

  // 🔹 Reset form
  const resetForm = () => {
    setTitle("");
    setDiss("");
    setEditId(null);
  };

  return (
    <div className="app">
      {/* 🔹 FORM */}
      <div className="form">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Enter description"
            value={diss}
            onChange={(e) => setDiss(e.target.value)}
          />

          <button type="submit">
            {editId ? "Update Note" : "Create Note"}
          </button>

          {editId && (
            <button type="button" onClick={resetForm}>
              Cancel
            </button>
          )}
        </form>
      </div>

      {/* 🔹 NOTES */}
      <div className="cards">
        {notes.map((item) => (
          <div key={item._id} className="card">
            <h2>{item.title}</h2>
            <p>{item.diss}</p>

            <div className="btns">
              <button onClick={() => handleDelete(item._id)}>Delete</button>

              <button onClick={() => handleEditClick(item)}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
