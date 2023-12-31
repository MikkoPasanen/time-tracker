/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import "../styles/task.css";
import { useState, useEffect } from "react";
import {
    BiTrash,
    BiPencil,
    BiXCircle,
    BiStopCircle,
    BiPlayCircle,
    BiX,
    BiPlusCircle,
} from "react-icons/bi";
import { useSettings } from "./SettingsContext";
import { Draggable } from "react-beautiful-dnd";
import AddTags from "./AddTags";

export default function Task({
    id,
    name,
    tags,
    time,
    active,
    startedTrackingTime,
    onDelete,
    tasks,
    updateTasks,
    removeTag,
    allTags,
    updateAllTags,
    fetchData,
    index,
}) {
    // This manages if the name change input field should be visible or not
    const [editMode, setEditMode] = useState(false);
    // This holds the tasks name
    const [taskName, setTaskName] = useState(name);
    // This holds the tasks tags
    const [taskTags, setTaskTags] = useState(tags);
    // This holds the tasks overall time in database
    const [taskTime, setTaskTime] = useState(time);
    // This holds the task overall time in UI
    const [taskTimeUI, setTaskTimeUI] = useState(time);
    // This manages if the task is currently tracking time or not
    const [trackingTime, setTrackingTime] = useState(active);
    // This holds the time when the time tracking started
    const [startedTrackingAt, setStartedTrackingAt] =
        useState(startedTrackingTime);

    // Manage add tags popup visibility
    const [addTagsPopup, setAddTagsPopup] = useState(false);

    // Custom hook from ThemeContext
    const { darkMode, multipleTrack } = useSettings();

    // When called, send PUT request to the db.json to change the name
    const submitTaskName = async (taskId, taskName) => {
        setEditMode(!editMode);
        let url = `http://localhost:3010/tasks`;

        // Copy of all tasks
        const updatedTasks = [...tasks];

        // Find this task
        const taskIndex = updatedTasks.findIndex((task) => task.id === taskId);
        const thisTask = updatedTasks[taskIndex];

        thisTask.name = taskName;

        updatedTasks[taskIndex] = thisTask;

        await fetch(url, {
            method: "PUT",
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
            },
            body: JSON.stringify({ tasks: updatedTasks }),
        });
    };

    // When called, handle the task time tracking logic
    const trackTime = async (taskId) => {
        let url = `http://localhost:3010/tasks/`;

        // Find all the tasks that are active right now
        const activeTasks = tasks.filter((task) => task.active === true);

        // Find this spesific tasks index
        const taskIndex = tasks.findIndex((task) => task.id === taskId);

        // Create copy of the tasks array
        const updatedTasks = [...tasks];

        // Fidn this spesific task
        const thisTask = updatedTasks[taskIndex];

        // If multiple task tracking is active
        // Or active task amount is less than 1
        // Or this spesific task is active
        if (multipleTrack || activeTasks.length < 1 || thisTask.active) {
            // If currently not tracking time
            if (!trackingTime) {
                // Change time tracking mode
                setTrackingTime(!trackingTime);

                // Use the useState that we got as props from Home.jsx
                // Use functional update to update the tasks array state,
                // since we need to know how many tasks are active at the moment
                updateTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, active: true } : task
                    )
                );

                // Store the start of the tracking time as seconds
                const time = Math.floor(Date.now() / 1000);

                thisTask.active = true;
                thisTask.startedTrackingAt = time;

                updatedTasks[taskIndex] = thisTask;

                // Send PUT request to db.json
                // Change tasks tracking start time and active status
                await fetch(url, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ tasks: updatedTasks }),
                });

                // Store the start of the tracking time into a state
                setStartedTrackingAt(time);

                // If currently tracking time
            } else {
                // Use the useState that we got as props from Home.jsx
                // Use functional update to update the tasks array state,
                // since we need to know how many tasks are active at the moment
                updateTasks((prevTasks) =>
                    prevTasks.map((task) =>
                        task.id === taskId ? { ...task, active: false } : task
                    )
                );

                // Calculate the time between the start of the time track and current time
                const timeSubstraction =
                    Math.floor(Date.now() / 1000) - startedTrackingAt;

                // Calculate the tasks overall tracked time and store it into a state
                const newTime = taskTime + timeSubstraction;
                setTaskTime(newTime);

                thisTask.active = false;
                thisTask.time = newTime;

                updatedTasks[taskIndex] = thisTask;

                // Send PUT request to db.json
                // Change tasks overall tracked time and active status
                await fetch(url, {
                    method: "PUT",
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                    },
                    body: JSON.stringify({ tasks: updatedTasks }),
                });

                // Change tracking mode
                setTrackingTime(!trackingTime);
            }
        }
    };

    // Renders if time tracking is active
    useEffect(() => {
        let interval;

        // If task is currently tracking time
        if (trackingTime) {
            // Add 1 second to the timer every second
            interval = setInterval(() => {
                const currentTime = Math.floor(Date.now() / 1000);
                const elapsedTime = currentTime - startedTrackingAt;
                const newTime = taskTime + elapsedTime;
                setTaskTimeUI(newTime);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        // Cleanup function to clear interval
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

        // Return the shown time and format it to be 00:00:00
        return `
        ${hours.toString().padStart(2, "0")}:${minutes
            .toString()
            .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    };

    // Close the tags add popup
    const addTagsPopupClose = async (selectedTags) => {
        setAddTagsPopup(false);

        // Copy of original task tags
        let originalTags = taskTags;

        // Copy of tasks
        let updatedTasks = [...tasks];

        // Find index of this task
        const taskIndex = updatedTasks.findIndex((task) => task.id === id);

        // Find this task
        const thisTask = updatedTasks[taskIndex];

        // If there is modified tags
        if (selectedTags !== undefined) {
            let url = `http://localhost:3010/tasks`;

            thisTask.tags = selectedTags;
            updatedTasks[taskIndex] = thisTask;

            await fetch(url, {
                method: "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-type": "application/json",
                },
                body: JSON.stringify({ tasks: updatedTasks }),
            });

            // Check if there are any new tags
            const tagsToUpdate = selectedTags.filter(
                (tag) => !allTags.includes(tag)
            );

            // Check what tags got removed
            const removedTags = originalTags.filter(
                (tag) => !selectedTags.includes(tag)
            );

            // Check what removed tags were unique
            const uniqueRemovedTags = removedTags.filter((tag) => {
                const existsInOtherTasks = tasks.some(
                    (task) => task.id !== id && task.tags.includes(tag)
                );
                return !existsInOtherTasks;
            });

            // If there was unique tags that got removed
            // or there is brand new tags
            if (uniqueRemovedTags.length > 0 || tagsToUpdate.length > 0) {
                // Create new array for all tags
                // that doesn't contain the removed unique tags
                const newTags = allTags.filter(
                    (tag) => !uniqueRemovedTags.includes(tag)
                );

                const newAllTags = [...newTags, ...tagsToUpdate];

                // Call updateAllTags that will update all-tags
                updateAllTags(newAllTags);
            }

            // Update this tasks tags visually
            setTaskTags(selectedTags);
            // Fetch all data from db.json so everything is up-to-date
            fetchData();
        }
    };

    return (
        <>
            <Draggable key={id} draggableId={id.toString()} index={index}>
                {(provided) => {
                    return (
                        <div
                            className="task"
                            theme={darkMode ? "dark-theme" : "light-theme"}
                            ref={provided.innerRef}
                            {...provided.dragHandleProps}
                            {...provided.draggableProps}
                        >
                            <div className="task-header">
                                <div className="task-name">
                                    {!editMode && <h3>{taskName}</h3>}
                                    {editMode && (
                                        <input
                                            className="name-input"
                                            placeholder={taskName}
                                            value={taskName}
                                            onChange={(e) =>
                                                setTaskName(e.target.value)
                                            }
                                        />
                                    )}
                                    {!editMode && (
                                        <button
                                            className="edit-task-name-pen"
                                            onClick={() =>
                                                setEditMode(!editMode)
                                            }
                                        >
                                            <BiPencil />
                                        </button>
                                    )}
                                    {editMode && (
                                        <button
                                            className="edit-task-name-x"
                                            onClick={() =>
                                                submitTaskName(id, taskName)
                                            }
                                        >
                                            <BiX />
                                        </button>
                                    )}
                                </div>
                                <button
                                    onClick={() => onDelete(id)}
                                    className="delete-task"
                                >
                                    <BiTrash />
                                </button>
                            </div>
                            <div className="task-content">
                                <p className="task-time">
                                    {formatTime(taskTimeUI)}
                                </p>
                                <button
                                    className={`start-time-button ${
                                        trackingTime
                                            ? "tracking-inactive"
                                            : "tracking-active"
                                    }`}
                                    onClick={() => trackTime(id)}
                                >
                                    {trackingTime ? (
                                        <BiStopCircle className="tracking-icon" />
                                    ) : (
                                        <BiPlayCircle className="tracking-icon" />
                                    )}
                                </button>
                                <p className="start-time-text">
                                    {trackingTime
                                        ? "Stop tracking"
                                        : "Start tracking"}
                                </p>
                                <div className="tags">
                                    {taskTags.map((tag, index) => (
                                        <small
                                            key={index.toString()}
                                            className="tag"
                                        >
                                            <button
                                                className="remove-tag"
                                                onClick={() =>
                                                    removeTag(
                                                        id,
                                                        tag,
                                                        setTaskTags
                                                    )
                                                }
                                            >
                                                <BiXCircle className="remove-tag-icon" />
                                            </button>
                                            {tag}
                                        </small>
                                    ))}
                                    {taskTags.length < 3 && (
                                        <button
                                            onClick={() =>
                                                setAddTagsPopup(true)
                                            }
                                            className="add-tag"
                                        >
                                            <BiPlusCircle />
                                            Add tag
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                }}
            </Draggable>

            {addTagsPopup && (
                <AddTags
                    onClose={addTagsPopupClose}
                    tags={taskTags}
                    allTags={allTags}
                    taskName={name}
                    updateTaskTags={setTaskTags}
                />
            )}
        </>
    );
}
