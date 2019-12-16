/*
 * @Author: Harry Tang - harry@powerkernel.com
 * @Date: 2019-12-15 23:22:42
 * @Last Modified by: Harry Tang - harry@powerkernel.com
 * @Last Modified time: 2019-12-15 23:34:11
 */
import React from "react";
import {Link} from "react-router-dom";

const Notes = props => (
  <div>
    <h2>Notes</h2>
    <ul>
      {props.notes.map(note => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>
  </div>
);

export default Notes;
