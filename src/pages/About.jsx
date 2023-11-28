import "../styles/about.css"

export default function About() {
    return (
        <>
            <div className="aboutpage">
                <div className="info-box">
                    <h1>ABOUT</h1>

                    <p>This is a time tracking app!</p>
                    <p>Author: Mikko Pasanen</p>
                </div>

                <div className="info-box">
                    <h2>INSTRUCTIONS</h2>
                    <p>Intructions on how to use the app goes here</p>
                </div>

                <div className="info-box">
                    <h2>COPYRIGHTS</h2>
                    <p>Possible copyright stuff goes here</p>
                </div>

                <div className="info-box">
                    <h2>AI USAGE</h2>
                    <p>AI usage goes here</p>
                </div>

                <div className="info-box">
                    <h2>WORK HOURS</h2>
                    <p>Work hours goes here</p>
                </div>

                <div className="info-box">
                    <h2>OTHER</h2>
                    <p>Other stuff like what was the hardest thing to implement</p>
                </div>
            </div>
        </>
    );
}
