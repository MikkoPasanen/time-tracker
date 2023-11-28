/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";
import { BiX } from "react-icons/bi";


export default function Task({ id, name, tags, time, onDelete, onNameChange}) {
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(name);

    const editNameChangeMode = () => {
        setEditMode(!editMode);
    }

    const editTaskName = (e) => {
        setTaskName(e.target.value)
    }

    const submitTaskName = () => {
        setEditMode(!editMode);
        onNameChange(id, taskName);
    }


    return (
        <div className="task">
            <div className="task-header">
                <div className="task-name">
                    {!editMode && <h3>{taskName}</h3>}
                    {editMode && (
                        <input
                            className="name-input"
                            placeholder={taskName}
                            value={taskName}
                            onChange={editTaskName}
                        />
                    )}
                    {!editMode && (
                        <button
                            className="edit-task-name-pen"
                            onClick={() => editNameChangeMode()}>
                            <BiPencil />
                        </button>
                    )}
                    {editMode && (
                        <button
                            className="edit-task-name-x"
                            onClick={() => submitTaskName()}>
                            <BiX />
                        </button>
                    )}
                </div>
                <button onClick={() => onDelete(id)} className="delete-task">
                    <BiTrash />
                </button>
            </div>

            <div className="task-content">
                <div className="tags">
                    {tags.map((tag, index) => (
                        <small key={index.toString()} className="tag">
                            <BiXCircle className="remove-tag" />
                            {tag}
                        </small>
                    ))}
                </div>
                <p>Time:</p>
                <p className="task-time">{time}</p>
                <button className="start-time">Start tracking</button>
            </div>
        </div>
    );
}