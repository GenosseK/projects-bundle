import './Math-Sprint-Game.css';

function MathSprintGame() {
    return (
        <main className='mathSprintGame'>

            <div className='mathSprintGame__game-container'>


                <div className='mathSprintGame__header-container'>
                    <h1 className='mathSprintGame__header'>Math Sprint Game</h1>
                </div>

                <div className='mathSprintGame__form-container'>
                    
                    <form className='mathSprintGame__form'>
                        <div className='mathSprintGame__selection-container'>

                            <div className='mathSprintGame__radio-container mathSprintGame__radio_label_selected'>
                                <label className='mathSprintGame__radio_label'>10 Questions</label>
                                <input className='mathSprintGame__input' type='radio' value='10' />
                                <span className='mathSprintGame__best-score-container'>
                                    <span className='mathSprintGame__best-score_title'>Best Score</span>
                                    <span className='mathSprintGame__best-score_value'>0.0s</span>
                                </span>
                            </div>

                            <div className='mathSprintGame__radio-container'>
                                <label className='mathSprintGame__radio_label'>25 Questions</label>
                                <input className='mathSprintGame__input' type='radio' value='25' />
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



        </main>
    )
};

export default MathSprintGame;