import { useEffect, useState } from 'react';
import './Math-Sprint-Game.css';

function MathSprintGame() {

    const [selectedOption, setSelectedOption] = useState('10');
    const [showOptionMenu, setShowOptionMenu] = useState(true);
    const [showCountdown, setShowCountdown] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [countdown, setCountdown] = useState('3');

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleStartRound = (e) => {
        e.preventDefault();
        setShowOptionMenu(false);
        setShowCountdown(true);
    };

    useEffect(() => {
        if (showCountdown) {
            let currentCountdown = 3;
            const countdownInterval = setInterval(() => {
                setCountdown((prevCountdown) => prevCountdown - 1);
            }, 1000);

            setTimeout(() => {
                clearInterval(countdownInterval);

                if (currentCountdown > 0) {
                    setCountdown('GO!');
                    setTimeout(() => {
                        setShowCountdown(false);
                        setShowGame(true);
                    }, 1000);
                }
            }, 3000);

            return () => clearInterval(countdownInterval);
        }
    }, [showCountdown]);




    return (
        <main className='mathSprintGame'>

            {showOptionMenu && (<div className='mathSprintGame__game-container'>


                <div className='mathSprintGame__header-container'>
                    <h1 className='mathSprintGame__header'>Math Sprint Game</h1>
                </div>

                <div className='mathSprintGame__form-container'>

                    <form className='mathSprintGame__form' onSubmit={handleStartRound}>
                        <div className='mathSprintGame__selection-container'>

                            <div className={`mathSprintGame__radio-container ${selectedOption === '10' && 'mathSprintGame__radio_label_selected'}`}>
                                <label className='mathSprintGame__radio_label'>10 Questions</label>
                                <input
                                    className='mathSprintGame__input'
                                    type='radio'
                                    value='10'
                                    checked={selectedOption === '10'}
                                    onChange={handleOptionChange}
                                />
                                <span className='mathSprintGame__best-score-container'>
                                    <span className='mathSprintGame__best-score_title'>Best Score</span>
                                    <span className='mathSprintGame__best-score_value'>0.0s</span>
                                </span>
                            </div>

                            <div className={`mathSprintGame__radio-container ${selectedOption === '25' && 'mathSprintGame__radio_label_selected'}`}>
                                <label className='mathSprintGame__radio_label'>25 Questions</label>
                                <input
                                    className='mathSprintGame__input'
                                    type='radio'
                                    value='25'
                                    checked={selectedOption === '25'}
                                    onChange={handleOptionChange}
                                />
                                <span className='mathSprintGame__best-score-container'>
                                    <span className='mathSprintGame__best-score_title'>Best Score</span>
                                    <span className='mathSprintGame__best-score_value'>0.0s</span>
                                </span>
                            </div>

                            <div className={`mathSprintGame__radio-container ${selectedOption === '50' && 'mathSprintGame__radio_label_selected'}`}>
                                <label className='mathSprintGame__radio_label'>50 Questions</label>
                                <input
                                    className='mathSprintGame__input'
                                    type='radio'
                                    value='50'
                                    checked={selectedOption === '50'}
                                    onChange={handleOptionChange}
                                />
                                <span className='mathSprintGame__best-score-container'>
                                    <span className='mathSprintGame__best-score_title'>Best Score</span>
                                    <span className='mathSprintGame__best-score_value'>0.0s</span>
                                </span>
                            </div>

                            <div className={`mathSprintGame__radio-container ${selectedOption === '99' && 'mathSprintGame__radio_label_selected'}`}>
                                <label className='mathSprintGame__radio_label'>99 Questions</label>
                                <input
                                    className='mathSprintGame__input'
                                    type='radio'
                                    value='99'
                                    checked={selectedOption === '99'}
                                    onChange={handleOptionChange}
                                />
                                <span className='mathSprintGame__best-score-container'>
                                    <span className='mathSprintGame__best-score_title'>Best Score</span>
                                    <span className='mathSprintGame__best-score_value'>0.0s</span>
                                </span>
                            </div>

                        </div>

                        <div className='mathSprintGame__selection_button-container'>
                            <button className='mathSprintGame__selection_button' type='submit'>Start Round</button>
                        </div>

                    </form>
                </div>


            </div>)}

            {showCountdown && (
                <div className='mathSprintGame__game-container'>
                    <div className='mathSprintGame__header-container'>
                        <h1 className='mathSprintGame__header'>Math Sprint Game</h1>
                    </div>
                    <h1 className='mathSprintGame__countdown'>{countdown}</h1>
                </div>
            )}

            {showGame && (
                <div className='mathSprintGame__game-container'>
                    <div className='mathSprintGame__header-container'>
                        <h1 className='mathSprintGame__header'>Math Sprint Game</h1>
                    </div>

                    <div className='mathSprintGame__equations-container'>
                        <div className='mathSpringGame__equation-item'>
                            <h1 className='mathSpringGame__equation'>2 + 2 = 10</h1>
                        </div>
                    </div>

                    <div className='mathSprintGame__answer-container'>
                        <button className='mathSprintGame__answer_wrong mathSprintGame__answer_button'>Wrong</button>
                        <button className='mathSprintGame__answer_right mathSprintGame__answer_button'>Right</button>
                    </div>

                </div>
            )}



        </main>
    )
};

export default MathSprintGame;