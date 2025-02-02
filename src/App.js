/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React, { useState, useEffect } from "react";
import noteService from "./services/notes";
import loginService from "./services/login";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Togglable from "./components/Togglable";
import NoteForm from "./components/NoteForm";
import Notes from "./components/Notes";
import Note from "./components/Note";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from "react-router-dom";

const Footer = () => {
  const footerStyle = {
    color: "green",
    fontStyle: "italic",
    fontSize: 16
  };

  return (
    <div style={footerStyle}>
      <br />
      <em>
        Note app, Department of Computer Science, University of Helsinki 2019
      </em>
    </div>
  );
};

const Home = () => {
  return <div>Home page</div>;
};

const App = props => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState("a new note...");
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  const [loginVisible, setLoginVisible] = useState(false);

  const [page, setPage] = useState("home");
  const toPage = page => event => {
    event.preventDefault();
    setPage(page);
  };

  const noteFormRef = React.createRef();

  useEffect(() => {
    noteService.getAll().then(initialNotes => {
      setNotes(initialNotes);
      //console.log(initialNotes);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedNoteappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);

  const handleLogin = async event => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password
      });

      window.localStorage.setItem("loggedNoteappUser", JSON.stringify(user));

      noteService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("Wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };
    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => (note.id !== id ? note : returnedNote)));
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  };

  const notesToShow = showAll
    ? notes
    : notes.filter(note => note.important === true);

  //   const rows = () =>
  //     notesToShow.map(note => (
  //       <Note
  //         key={note.id}
  //         note={note}
  //         toggleImportance={() => {
  //           toggleImportanceOf(note.id);
  //         }}
  //         label={note.important ? "mark not important" : "mark important"}
  //       />
  //     ));

  const handleNoteChange = event => {
    setNewNote(event.target.value);
  };

  const addNote = event => {
    event.preventDefault();
    noteFormRef.current.toggleVisibility();
    const noteObject = {
      content: newNote,
      date: new Date().toISOString(),
      important: Math.random() > 0.5,
      id: notes.length + 1
    };

    noteService.create(noteObject).then(returnedNote => {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    });
  };

  const loginForm = () => {
    return (
      <Togglable buttonLabel="login">
        <Login
          loginVisible={loginVisible}
          password={password}
          username={username}
          handleLogin={handleLogin}
          setPassword={setPassword}
          setUsername={setUsername}
        />
      </Togglable>
    );
  };

  const noteForm = () => (
    <Togglable buttonLabel="new note" ref={noteFormRef}>
      <NoteForm
        onSubmit={addNote}
        value={newNote}
        handleChange={handleNoteChange}
      />
    </Togglable>
  );

  const padding = {
    padding: 5
  };

  const noteById = id => notes.find(note => note.id === id);

  return (
    <div>
      <Router>
        <div>
          <Link style={padding} to="/">
            home
          </Link>
          <Link style={padding} to="/notes">
            notes
          </Link>
          <Link style={padding} to="/users">
            users
          </Link>
          {/* {user ? <em>{user} logged in</em> : <Link to="/login">login</Link>} */}
        </div>

        <h1>Power Note</h1>

        {/* <Notification message={errorMessage} /> */}

        <Route exact path="/" render={() => <Home />} />
        <Route exact path="/notes" render={() => <Notes notes={notes} />} />
        <Route
          exact
          path="/notes/:id"
          render={({ match }) => <Note note={noteById(match.params.id)} />}
        />

        <Footer />
      </Router>
    </div>
  );
};

export default App;
