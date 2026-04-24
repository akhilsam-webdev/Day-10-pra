import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    fetchNotes();
  }, []);

  function fetchNotes() {
    axios.get("http://localhost:3000/api/note").then((res) => {
      console.log(res.data.note);
      setNotes(res.data.note);
    });
  }

  function handelSubmit(e) {
    e.preventDefault();

    const { title, diss } = e.target;
    console.log(title.value, diss.value);

    axios
      .post("http://localhost:3000/api/note", {
        title: title.value,
        diss: diss.value,
      })
      .then((res) => {
        console.log(res);
        fetchNotes()
      });

    e.target.reset();
  }

  return (
    <div className="app">
      <div className="form">
        <form onSubmit={handelSubmit}>
          <input type="text" name="title" placeholder="enter title" />
          <input type="text" name="diss" placeholder="enter discription" />
          <button>Create note</button>
        </form>
      </div>
      <div className="cards">
        {notes.map((item) => (
          <div key={item._id} className="card">
            <h2>{item.title}</h2>
            <p>{item.diss}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
