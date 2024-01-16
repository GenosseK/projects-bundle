import { useState } from 'react';
import './Math-Sprint-Game.css';

function MathSprintGame() {

    const [selectedOption, setSelectedOption] = useState('10');
    const [showCountdown, setShowCountdown] = useState(false);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleStartRound = (e) => {
        e.preventDefault();
        setShowCountdown(true);

        
        setTimeout(() => {
            console.log('Countdown complete! Start the game.');
        }, 3000);
    };



    return (
        <main className='mathSprintGame'>

            <div className='mathSprintGame__game-container'>


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

                            <div className='mathSprintGame__radio-container'>
                                <label className='mathSprintGame__radio_label'>50 Questions</label>
                                <input className='mathSprintGame__input' type='radio' value='50' />
                                <span className='mathSprintGame__best-score-container'>
                                    <span className='mathSprintGame__best-score_title'>Best Score</span>
                                    <span className='mathSprintGame__best-score_value'>0.0s</span>
                                </span>
                            </div>

                            <div className='mathSprintGame__radio-container'>
                                <label className='mathSprintGame__radio_label'>99 Questions</label>
                                <input className='mathSprintGame__input' type='radio' value='99' />
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


            </div>

            <div className='mathSprintGame__game-container mathSprintGame__game-container_hidden'>
                <div className='mathSprintGame__header-container'>
                    <h1 className='mathSprintGame__header'>Math Sprint Game</h1>
                </div>
                <h1 className='mathSprintGame__countdown'>3</h1>
            </div>



        </main>
    )
};

export default MathSprintGame;