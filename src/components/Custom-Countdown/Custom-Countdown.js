import React, { useState, useEffect } from 'react';
import './Custom-Countdown.css';
import timeVideo from '../../images/time.mp4';

function CustomCountdown() {
    // State to manage countdown data
    const [countdownData, setCountdownData] = useState({
        title: '',
        date: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    });

    // State to manage the visibility of different countdown sections
    const [countdownSection, setCountdownSection] = useState('input'); // Possible values: 'input', 'timer', 'complete'

    const today = new Date().toISOString().split('T')[0];

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Calculate the time remaining based on the selected date
        const selectedDate = new Date(countdownData.date).getTime();
        const now = new Date().getTime();
        const timeRemaining = selectedDate - now;

        // Calculate days, hours, minutes, and seconds
        const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

        // Update countdown data and switch to the timer section
        setCountdownData({
            ...countdownData,
            days,
            hours,
            minutes,
            seconds
        });
        setCountdownSection('timer');
    };

    // Function to handle new countdown button click
    const handleNewCountdown = () => {
        // Reset countdown data and switch to the input section
        setCountdownData({
            title: '',
            date: '',
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        });
        setCountdownSection('input');
    };

    useEffect(() => {
        // Function to update the countdown every second
        const updateCountdown = () => {
            const now = new Date().getTime();
            const selectedDate = new Date(countdownData.date).getTime();
            const timeRemaining = selectedDate - now;

            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            // Update countdown data
            setCountdownData({
                ...countdownData,
                days,
                hours,
                minutes,
                seconds
            });

            // If the countdown is finished, switch to the complete section
            if (timeRemaining < 0) {
                setCountdownSection('complete');
            }
        };

        // Update countdown every second
        const countdownInterval = setInterval(updateCountdown, 1000);

        // Cleanup interval on component unmount
        return () => clearInterval(countdownInterval);
    }, [countdownData]);

    return (
        <main className='countdown'>
            <div className='countdown__video-container'>
                <video className='countdown__video' src={timeVideo} loop muted autoPlay />
                <div className='video__overlay'></div>
            </div>
            <div className='countdown__container'>
                {countdownSection === 'input' && (
                    <div className='countdown__input-container'>
                        <h1 className='countdown__title'>Create a Custom Countdown!</h1>
                        <form className='countdown__form' onSubmit={handleSubmit}>
                            <label className='countdown__form_label'>Title</label>
                            <input
                                className='countdown__form_input'
                                type='text'
                                placeholder='What are you counting down to?'
                                value={countdownData.title}
                                onChange={(e) => setCountdownData({ ...countdownData, title: e.target.value })}
                            />
                            <label className='countdown__form_label'>Select a Date</label>
                            <input
                                className='countdown__form_input'
                                type='date'
                                min={today}
                                value={countdownData.date}
                                onChange={(e) => setCountdownData({ ...countdownData, date: e.target.value })}
                            />
                            <button className='countdown__submit-button' type='submit'>Submit</button>
                        </form>
                    </div>
                )}
                {countdownSection === 'timer' && (
                    <div className='countdown__timer-container'>
                        <h1 className='countdown__title'>{countdownData.title}</h1>
                        <ul className='countdown__timer_list'>
                            <li className='countdown__timer_item'><span className='countdown__timer_item-span'>{countdownData.days}</span>Days</li>
                            <li className='countdown__timer_item'><span className='countdown__timer_item-span'>{countdownData.hours}</span>Hours</li>
                            <li className='countdown__timer_item'><span className='countdown__timer_item-span'>{countdownData.minutes}</span>Minutes</li>
                            <li className='countdown__timer_item'><span className='countdown__timer_item-span'>{countdownData.seconds}</span>Seconds</li>
                        </ul>
                        <button className='countdown__submit-button' onClick={handleNewCountdown}>RESET</button>
                    </div>
                )}
                {countdownSection === 'complete' && (
                    <div className='countdown__complete'>
                        <h1 className='countdown__complete_title'>Countdown Complete!</h1>
                        <h1 className='countdown__title'>{countdownData.title}</h1>
                        <button className='countdown__submit-button' onClick={handleNewCountdown}>NEW COUNTDOWN</button>
                    </div>
                )}
            </div>
        </main>
    );
}

export default CustomCountdown;
