import React from 'react';
import { Link } from 'react-router-dom';
import './Greeting-Page.css';

const GreetingPage = () => {
    return (
        <div className="splash-container">
            <h1>Welcome to My Portfolio</h1>
            <p>Explore my projects below:</p>
            <div className="projects-container">
                <Link to="/quote-generator" className="project-button">Quote Generator</Link>
                <Link to="/infinite-scroll" className="project-button">Infinite Scroll</Link>
                <Link to="/picture-in-picture" className="project-button">Picture in Picture</Link>
                <Link to="/joke-teller" className="project-button">Joke Teller</Link>
                <Link to="/dark-light" className="project-button">Dark/Light Mode</Link>
                <Link to="/animated-template" className="project-button">Animated Template</Link>
                <Link to="/navigation-nation" className="project-button">Navigation Nation</Link>
                <Link to="/music-player" className="project-button">Music Player</Link>
                <Link to="/custom-countdown" className="project-button">Custom Countdown</Link>
                <Link to="/book-keeper" className="project-button">Book Keeper</Link>
                <Link to="/video-player" className="project-button">Video Player</Link>
                <Link to="/form-validator" className="project-button">Form Validator</Link>
                <Link to="/spock-rock-game" className="project-button">Spock Rock Game</Link>
                <Link to="/nasa-apod" className="project-button">NASA APOD</Link>
                <Link to="/math-sprint-game" className="project-button">Math Sprint Game</Link>
                <Link to="/drag-and-drop" className="project-button">Drag and Drop</Link>
                <Link to="/calculator" className="project-button">Calculator</Link>
                <Link to="/splash-page" className="project-button">Splash Page</Link>
                <Link to="/paint-clone" className="project-button">Paint Clone</Link>
                <Link to="/pong" className="project-button">Pong</Link>
            </div>
        </div>
    );
};

export default GreetingPage;
