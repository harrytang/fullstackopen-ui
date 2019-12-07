/**
 * @author Harry Tang <harry@powerkernel.com>
 * @link https://powerkernel.com
 * @copyright Copyright (c) 2019 Power Kernel
 */

import React from 'react'

const Note = ({note, toggleImportance, label}) => {
    return (
        <li className="note">
            {note.content} <button onClick={toggleImportance}>{label}</button>
        </li>
    )
};

export default Note;