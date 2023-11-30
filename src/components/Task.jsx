/* eslint-disable react/prop-types */
import "../styles/task.css"
import { useState, useEffect } from "react";
import { BiTrash } from "react-icons/bi";
import { BiPencil } from "react-icons/bi";
import { BiXCircle } from "react-icons/bi";
import { BiStopCircle } from "react-icons/bi";
import { BiPlayCircle } from "react-icons/bi";
import { BiX } from "react-icons/bi";
import { useTheme } from "../components/ThemeContext";


export default function Task({
    id,
    name,
    tags,
    time,
    active,
    startedTrackingTime,
    onDelete,
}) {
    // This manages if the name change input field should be visible or not
    const [editMode, setEditMode] = useState(false);
    // This holds the tasks name
    const [taskName, setTaskName] = useState(name);
    // This holds the tasks overall time in database
    const [taskTime, setTaskTime] = useState(time);
    // This holds the task overall time in UI
    const [taskTimeUI, setTaskTimeUI] = useState(time);
    // This manages if the task is currently tracking time or not
    const [trackingTime, setTrackingTime] = useState(active);
    // This holds the time when the time tracking started
    const [startedTrackingAt, setStartedTrackingAt] =
        useState(startedTrackingTime);

    const {darkMode} = useTheme();

    const editNameChangeMode = () => {
        setEditMode(!editMode);
    };

    const editTaskName = (e) => {
        setTaskName(e.target.value);
    };

    // When called, send PATCH request to the db.json to change the name
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

    // When called, handle the task time tracking logic
    const trackTime = async (taskId) => {
        let url = `http://localhost:3010/tasks/${taskId}`;

        // If currently not tracking time
        if (!trackingTime) {
            // Change time tracking mode
            setTrackingTime(!trackingTime);

            // Store the start of the tracking time as seconds
            const time = Math.floor(Date.now() / 1000);

            // Send PATCH request to db.json
            // Change tasks tracking start time and active status
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

            // Store the start of the tracking time into a state
            setStartedTrackingAt(time);

            // If currently tracking time
        } else {
            // Calculate the time between the start of the time track and current time
            const timeSubstraction =
                Math.floor(Date.now() / 1000) - startedTrackingAt;

            // Calculate the tasks overall tracked time and store it into a state
            const newTime = taskTime + timeSubstraction;
            setTaskTime(newTime);

            // Send PATCH request to db.json
            // Change tasks overall tracked time and active status
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

            // Change tracking mode
            setTrackingTime(!trackingTime);
        }
    };

    useEffect(() => {
        let interval;

        if (trackingTime) {
            interval = setInterval(() => {
                const currentTime = Math.floor(Date.now() / 1000);
                const elapsedTime = currentTime - startedTrackingAt;
                const newTime = taskTime + elapsedTime;
                setTaskTimeUI(newTime);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => {
            clearInterval(interval);
        };
    }, [trackingTime, startedTrackingAt, taskTime]);

    // Used to format time into hh:mm:ss
    const formatTime = (seconds) => {
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
        <div className="task" theme={darkMode ? "dark-theme" : "light-theme"}>
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
                <p className="task-time">{formatTime(taskTimeUI)}</p>
                <button
                    className={`start-time-button ${
                        trackingTime ? "tracking-inactive" : "tracking-active"
                    }`}
                    onClick={() => trackTime(id)}
                >
                    {trackingTime ? 
                        <BiStopCircle className="tracking-icon" />
                        : 
                        <BiPlayCircle className="tracking-icon" />
                    }
                </button>
                <p className="start-time-text">{trackingTime ? 'Stop tracking' : 'Start tracking'}</p>
            </div>
        </div>
    );
}
