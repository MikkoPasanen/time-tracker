// TODO: Fill out the information here before returning the project

import "../styles/about.css";

export default function About() {
    return (
        <>
            <div className="aboutpage">
                <div className="info-box">
                    <h1>ABOUT</h1>

                    <p>Time tracking app for individual tasks</p>
                </div>

                <div className="info-box">
                    <h2>INSTRUCTIONS</h2>
                    <p>Create task by pressing the "Create task" button and fill out the tasks info.</p>
                    <p>Start tracking time by pressing the green start tracking button and stop tracking time vice versa.</p>
                    <p>Modify tasks tags by either deleting them or changing them from the "Add tag" button if there is less than 3 tags in a task.</p>
                    <p>Filter tasks based on tags from the dropdown menu.</p>
                    <p>Change tasks name by pressing the pen next to the tasks name and then save the name by pressing the x.</p>
                    <p>Toggles for light / dark mode and track multiple tasks / 1 task can be found on the settings page</p>
                    <p>You can also drag and drop tasks!</p>
                </div>

                <div className="info-box">
                    <h2>COPYRIGHTS</h2>
                    <p>Other than icons and react-select dropdown menus, everything is made by me.</p>
                    <a href="https://github.com/atisawd/boxicons">Icons</a>
                    <br />
                    <br />
                    <a href="https://react-select.com/home">React Select</a>
                </div>

                <div className="info-box">
                    <h2>AI USAGE</h2>
                    <p>I used ChatGPT for recommending me different libraries to use in this project such as react-select.</p>
                    <p>ChatGPT was also used to help me decide on how I should implement the UI and the structure of my files.</p>
                </div>

                <div className="info-box">
                    <h2>WORK HOURS</h2>
                    <p>This project took me roughly 50h</p>
                </div>

                <div className="info-box">
                    <h2>OTHER</h2>
                    <p>I learned a lot from this project! Mainly on how React works and how it differs from vanilla JavaScript.</p>
                    <p>There were major problems to tackle, such as:</p>
                    <br />
                    <p>Settings: useContext was pretty hard to grasp so implementing setting screens toggles were pretty painful.</p>
                    <br />
                    <p>Tags: Tags took me the most time as they were used pretty much everywhere so keeping everything updated was hard.</p>
                    <br />
                    <p>Structure: As this was the first "big" project I've done, desining the overall look of the app took its own time.</p>
                </div>
            </div>
        </>
    );
}
