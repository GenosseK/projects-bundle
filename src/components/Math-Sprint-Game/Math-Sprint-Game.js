import { useEffect, useState } from 'react';
import './Math-Sprint-Game.css';

function MathSprintGame() {
    const [selectedOption, setSelectedOption] = useState('10');
    const [showOptionMenu, setShowOptionMenu] = useState(true);
    const [showCountdown, setShowCountdown] = useState(false);
    const [showGame, setShowGame] = useState(false);
    const [showScore, setShowScore] = useState(false);
    const [countdown, setCountdown] = useState('3');
    const [equationsArray, setEquationsArray] = useState([]);
    const [currentEquationIndex, setCurrentEquationIndex] = useState(0);
    const [timer, setTimer] = useState(0);

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleStartRound = (e) => {
        e.preventDefault();
        setShowOptionMenu(false);
        setShowCountdown(true);
        startCountdown();
    };

    const handleAnswer = (isCorrect) => {
        if (isCorrect) {
            setTimer((prevTimer) => prevTimer + 1);
        } else {
            setTimer((prevTimer) => prevTimer + 1);
            // Penalty for incorrect answer
        }

        // Move to the next equation
        setCurrentEquationIndex((prevIndex) => prevIndex + 1);

        // Check if all questions answered
        if (currentEquationIndex === equationsArray.length - 1) {
            setShowGame(false);
            setShowScore(true);
        }
    };

    const startCountdown = () => {
        let currentCountdown = countdown;
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
                    createEquations();
                }, 1000);
            }
        }, 3000);

        return () => clearInterval(countdownInterval);
    };

    let firstNumber, secondNumber;
    let equationObject;
    let wrongFormat = [];

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    function shuffle(array) {
        let currentIndex = array.length;
        let temporaryValue;
        let randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }

    const createEquations = () => {
        setTimer(0);
        const questionAmount = parseInt(selectedOption); // Convert selectedOption to an integer
        const correctEquations = getRandomInt(questionAmount);
        const wrongEquations = questionAmount - correctEquations;

        for (let i = 0; i < correctEquations; i++) {
            firstNumber = getRandomInt(9);
            secondNumber = getRandomInt(9);
            const equationValue = firstNumber * secondNumber;
            const equation = `${firstNumber} x ${secondNumber} = ${equationValue}`;
            equationObject = { value: equation, evaluated: 'true' };
            equationsArray.push(equationObject);
        }

        for (let i = 0; i < wrongEquations; i++) {
            firstNumber = getRandomInt(9);
            secondNumber = getRandomInt(9);
            const equationValue = firstNumber * secondNumber;
            wrongFormat[0] = `${firstNumber} x ${secondNumber + 1} = ${equationValue}`;
            wrongFormat[1] = `${firstNumber} x ${secondNumber} = ${equationValue - 1}`;
            wrongFormat[2] = `${firstNumber + 1} x ${secondNumber} = ${equationValue}`;
            const formatChoice = getRandomInt(2);
            const equation = wrongFormat[formatChoice];
            equationObject = { value: equation, evaluated: 'false' };
            equationsArray.push(equationObject);
        }

        shuffle(equationsArray);
        setEquationsArray(equationsArray);
    };


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
                        {equationsArray.map((equation, index) => (
                            <div key={index} className='mathSpringGame__equation-item'>
                                <h1 className='mathSpringGame__equation'>{equation.value}</h1>
                            </div>
                        ))}
                    </div>

                    <div className='mathSprintGame__answer-container'>
                        <button className='mathSprintGame__answer_wrong mathSprintGame__answer_button'>
                            Wrong
                        </button>
                        <button className='mathSprintGame__answer_right mathSprintGame__answer_button'>
                            Right
                        </button>
                    </div>
                </div>
            )}

            {showScore &&(
                <div className='mathSprintGame__game-container'>
                <div className='mathSprintGame__header-container'>
                    <h1 className='mathSprintGame__header'>Math Sprint Game</h1>
                </div>

                <div className='mathSprintGame__score-container'>
                    <h1 className='mathSprintGame__score_title'>Your Time</h1>
                    <h1 className='mathSprintGame__score_final-time'>2222</h1>
                    <h1 className='mathSprintGame__score_base-time'>222</h1>
                    <h1 className='mathSprintGame__score_penalty-time'>222</h1>
                </div>

                <div className='mathSprintGame__score-footer'>
                    <button className='mathSprintGame__play-again mathSprintGame__answer_button'>Play Again</button>
                </div>
                </div>
            )}


        </main>
    )
};

export default MathSprintGame;