/* eslint-disable react/prop-types */
import { useState } from "react";
import { BiX } from "react-icons/bi";

export default function AddTask({ onClose, onTaskAdd }) {
    const [taskName, setTaskName] = useState("");
    const [tags, setTags] = useState([]);

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    };

    const handleTagsChange = (e) => {
        setTags(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        let tagsArr = [];
        if (typeof tags === "string") {
            tagsArr = tags.split(",").map((tag) => tag.trim());
        } else {
            tagsArr = tags;
        }

        const newTask = {
            id: generateId(),
            name: taskName,
            tags: tagsArr,
            startedTrackingAt: null,
            time: 0,
            active: false,
        };

        console.log(newTask);

        onTaskAdd(newTask);
        onClose();
    };

    const generateId = () => {
        return Date.now() + Math.floor(Math.random() * 10);
    };

    return (
        <div className="create-task-popup">
            <div className="create-task-header">
                <h3>Create new task</h3>
                <button onClick={onClose} className="close-popup">
                    <BiX />
                </button>
            </div>
            <form onSubmit={handleSubmit} className="create-task-form">
                <label className="create-task-name">
                    <p>Task name</p>
                    <input
                        className="create-task-name-input"
                        type="text"
                        value={taskName}
                        onChange={handleTaskNameChange}
                        required
                        placeholder="Eg: Feed the dog"
                    />
                </label>
                <label className="create-task-tags">
                    <p>Tags</p>
                    <input
                        className="create-task-tags-input"
                        type="text"
                        value={tags}
                        onChange={handleTagsChange}
                        placeholder="Eg: pets, important"
                    />
                </label>
                <button type="submit" className="create-task-button">
                    Create task
                </button>
            </form>
        </div>
    );
}
