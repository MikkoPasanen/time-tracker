/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiTrash } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";
import { BiX } from "react-icons/bi";

export default function Task({
    id,
    name,
    tags,
    time,
    active,
    startedTrackingTime,
    onDelete,
}) {
    const [editMode, setEditMode] = useState(false);
    const [taskName, setTaskName] = useState(name);
    const [taskTime, setTaskTime] = useState(time);
    const [trackingTime, setTrackingTime] = useState(active);
    const [startedTrackingAt, setStartedTrackingAt] =
        useState(startedTrackingTime);

    const editNameChangeMode = () => {
        setEditMode(!editMode);
    };

    const editTaskName = (e) => {
        setTaskName(e.target.value);
    };

    const submitTaskName = async (taskId, taskName) => {
        setEditMode(!editMode);
        let url = `http://localhost:3010/tasks/${taskId}`;

        await fetch(url, {
            method: "PATCH",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                name: taskName,
            }),
        });
    };

    const trackTime = async (taskId) => {
        let url = `http://localhost:3010/tasks/${taskId}`;

        if (!trackingTime) {
            console.log("Started tracking");
            const time = Date.now();
            setTrackingTime(!trackingTime);
            await fetch(url, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    startedTrackingAt: time,
                    active: true,
                }),
            });
            setStartedTrackingAt(time);
        } else {
            const timeSubstraction = Date.now() - startedTrackingAt;
            setTrackingTime(!trackingTime);
            const newTime = taskTime + timeSubstraction;
            setTaskTime(newTime);
            await fetch(url, {
                method: "PATCH",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    time: newTime,
                    active: false,
                }),
            });
        }
    };

    // Used to format time into hh:mm:ss
    const formatTime = (milliseconds) => {
        // Get seconds from the milliseconds
        let seconds = Math.floor(milliseconds / 1000);

        // Get hours from the seconds and calculate remaining seconds
        let hours = Math.floor(seconds / 3600);
        seconds %= 3600;

        // Get minutes from the remaining seconds
        let minutes = Math.floor(seconds / 60);
        seconds %= 60;

        // Add 0 infront of the numbers if they are under 10
        hours = hours < 10 ? "0" + hours : hours;
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        return `${hours}:${minutes}:${seconds}`;
    };

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
                            onClick={() => editNameChangeMode()}
                        >
                            <BiPencil />
                        </button>
                    )}
                    {editMode && (
                        <button
                            className="edit-task-name-x"
                            onClick={() => submitTaskName(id, taskName)}
                        >
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
                <p className="task-time">{formatTime(taskTime)}</p>
                <button className="start-time" onClick={() => trackTime(id)}>
                    Start tracking
                </button>
            </div>
        </div>
    );
}
