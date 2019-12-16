/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from "react";

// const Note = ({note, toggleImportance, label}) => {
//     return (
//         <li className="note">
//             {note.content} <button onClick={toggleImportance}>{label}</button>
//         </li>
//     )
// };

const Note = ({ note }) => {
  console.log(note);
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? "important" : ""}</strong>
      </div>
    </div>
  );
};

export default Note;
