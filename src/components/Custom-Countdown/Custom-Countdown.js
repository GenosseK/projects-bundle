import React, { useState, useEffect } from 'react';
import './Custom-Countdown.css';
import timeVideo from '../../images/time.mp4';

function CustomCountdown() {

    const [countdownData, setCountdownData] = useState({
        title: '',
        date: '',
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    const [countdownSection, setCountdownSection] = useState('input');
    const [countdownActive, setCountdownActive] = useState(false);

    useEffect(() => {
        const savedCountdown = JSON.parse(localStorage.getItem('countdown'));

        if (savedCountdown) {
            setCountdownData((prevCountdownData) => ({
                ...prevCountdownData,
                ...savedCountdown,
            }));
            setCountdownSection('timer');
            startCountdown(savedCountdown.date);
        }
    }, []);

    const startCountdown = (date) => {
        const countdownValue = new Date(date).getTime();

        const updateCountdown = () => {
            const now = new Date().getTime();
            const distance = countdownValue - now;

            if (distance < 0) {
                setCountdownSection('complete');
                clearInterval(countdownActive);
                localStorage.removeItem('countdown');
            } else {
                setCountdownData((prevCountdownData) => {
                    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                    return { ...prevCountdownData, days, hours, minutes, seconds };
                });
            }
        };

        updateCountdown();

        const countdownInterval = setInterval(updateCountdown, 1000);
        setCountdownActive(countdownInterval);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!countdownData.title || !countdownData.date) {
            alert('Please fill in all fields.');
            return;
        }

        const selectedDate = new Date(countdownData.date).getTime();
        const currentDate = new Date().getTime();

        if (selectedDate < currentDate) {
            alert('Please select a future date and time.');
            return;
        }

        localStorage.setItem('countdown', JSON.stringify(countdownData));
        setCountdownSection('timer');
        startCountdown(countdownData.date);
    };

    const handleNewCountdown = () => {
        setCountdownData({
            title: '',
            date: '',
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
        });
        setCountdownSection('input');
        clearInterval(countdownActive);
        localStorage.removeItem('countdown');
    };

    const getMinDate = () => {
        const today = new Date().toISOString().slice(0, 16);  // Get the current date in the 'yyyy-mm-ddThh:mm' format
        return today;
    };


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
                            <label className='countdown__form_label'>Select a Date and Time</label>
                            <input
                                className='countdown__form_input'
                                type='datetime-local'
                                min={getMinDate()}
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
