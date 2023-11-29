import { useState, useEffect } from "react";
import Task from "../components/Task";
import AddTask from "../components/AddTask";
import { BiPlusCircle } from "react-icons/bi";
import "../styles/home.css";
import "../styles/addtask.css";

export default function Home() {
    const [tasks, setTasks] = useState([]);
    const [showPopup, setShowPopup] = useState(false);
    const [fetchData, setFetchData] = useState(false);

    const fetchTasks = async () => {
        let url = "http://localhost:3010/tasks";

        const res = await fetch(url);
        const tasks = await res.json();
        setTasks(tasks);
    };

    useEffect(() => {
        fetchTasks();
    }, [fetchData]);

    const handleTaskAdd = async (newTask) => {
        let url = "http://localhost:3010/tasks";
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

    const handleTaskDelete = async (taskId) => {
        let url = `http://localhost:3010/tasks/${taskId}`;

        await fetch(url, {
            method: "DELETE",
        });

        setFetchData(!fetchData);
    };

    return (
        <>
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
                    />
                ))}
            </div>

            {showPopup && (
                <AddTask
                    onClose={() => setShowPopup(false)}
                    onTaskAdd={handleTaskAdd}
                />
            )}
        </>
    );
}
