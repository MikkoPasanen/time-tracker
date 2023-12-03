/* eslint-disable react/no-unknown-property */
import { useState, useEffect } from "react";
import Task from "../components/Task";
import { useSettings } from "../components/SettingsContext";
import AddTask from "../components/AddTask";
import { BiPlusCircle } from "react-icons/bi";
import "../styles/home.css";
import "../styles/addtask.css";

export default function Home() {
    // Holds all tasks
    const [tasks, setTasks] = useState([]);
    // Manage create task popup visibility
    const [showPopup, setShowPopup] = useState(false);
    // Manage if data should be fetched again from db.json or not
    const [fetchData, setFetchData] = useState(false);
    const [allTags, setAllTags] = useState([]);

    const { darkMode } = useSettings();

    // When called, fetch all tasks from db.json
    const fetchTasks = async () => {
        let url = "http://localhost:3010/tasks";

        const res = await fetch(url);
        const tasks = await res.json();
        setTasks(tasks);
    };

    const fetchTags = async () => {
        let url = "http://localhost:3010/all-tags";

        const res = await fetch(url);
        const tags = await res.json();
        console.log(tags);
        console.log(tags.all - tags);
        setAllTags(tags.allTags);
    };

    useEffect(() => {
        fetchTasks();
        fetchTags();
    }, [fetchData]);

    // When new task is created, send POST request to db.json
    const handleTaskAdd = async (newTask) => {
        let url = "http://localhost:3010/tasks";

        // Add the new task into a state so it gets updated in the UI
        setTasks([...tasks, newTask]);

        await fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newTask),
        });
    };

    // When called, send DELETE request to db.json for deletion of spesific task
    const handleTaskDelete = async (taskId) => {
        let url = `http://localhost:3010/tasks/${taskId}`;

        await fetch(url, {
            method: "DELETE",
        });

        setFetchData(!fetchData);
    };

    const handleUpdateTags = async (newTags) => {
        let url = "http://localhost:3010/all-tags";

        await fetch(url, {
            method: "PATCH",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({ allTags: newTags }),
        });

        fetchTags();
    };

    return (
        <div theme={darkMode ? "dark-theme" : "light-theme"}>
            <h1>Home</h1>
            <p>Create tasks and keep track of time for spesific tasks</p>

            <div className="headers">
                <h2>All tasks</h2>
                <button
                    className="create-task"
                    onClick={() => setShowPopup(true)}
                >
                    <BiPlusCircle />
                    Create task
                </button>
            </div>

            <div className="tasks-container">
                {tasks.map((task) => (
                    <Task
                        key={task.id.toString()}
                        id={task.id}
                        name={task.name}
                        tags={task.tags}
                        active={task.active}
                        time={task.time}
                        startedTrackingTime={task.startedTrackingAt}
                        onDelete={() => handleTaskDelete(task.id)}
                        tasks={tasks}
                        updateTasks={setTasks}
                    />
                ))}
            </div>

            {showPopup && (
                <AddTask
                    onClose={() => setShowPopup(false)}
                    onTaskAdd={handleTaskAdd}
                    allTags={allTags}
                    updateAllTags={handleUpdateTags}
                />
            )}
        </div>
    );
}
