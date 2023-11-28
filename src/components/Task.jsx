/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";



export default function Task({ id, title, tags, time, onDelete}) {
    const [editMode, setEditMode] = useState(false);

    const handleNameChange = () => {
        setEditMode(!editMode);
    }

    return (
        <div className="task">
            <div className="task-header">
                <div className="task-name">
                    {!editMode && <h3>{title}</h3>}
                    {editMode && <input className="name-input" />}
                    <span onClick={() => handleNameChange()}>
                        <BiPencil />
                    </span>
                </div>
                <button onClick={() => onDelete(id)} className="delete-task">
                    <BiTrash />
                </button>
            </div>

            <div className="task-content">
                <div className="tags">
                    {tags.map((tag, index) => (
                        <small key={index.toString()} className="tag">
                            <BiXCircle className="remove-tag"/>
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