import { faHandLizard, faHandPaper, faHandRock, faHandScissors, faHandSpock } from '@fortawesome/free-regular-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Spock-Rock-Game.css';

function SpockRockGame() {
    return (
    <main className='spockRockGame'>
        <div className='spockRockGame__container'>
            <div className='spockRockGame__header__container'>
                <h1 className='spockRockGame__header'>Rock Paper Scissors Lizard Spock</h1>
            </div>

            <div className='spockRockGame__player__container'>
                <h2 className='spockRockGame__player__title human'>You - <span className='player__score'></span><span className='player__choice-title'></span></h2>
                <FontAwesomeIcon icon={faHandRock} title='Rock' className='player__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandPaper} title='Paper' className='player__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandScissors} title='Scissors' className='player__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandLizard} title='Lizard' className='player__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandSpock} title='Spock' className='player__choice game__choice'></FontAwesomeIcon>
            </div>

            <div className='spockRockGame__player__container'>
                <h2 className='spockRockGame__player__title computer'>You - <span className='computer__score'></span><span className='player__choice-title'></span></h2>
                <FontAwesomeIcon icon={faHandRock} title='Rock' className='computer__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandPaper} title='Paper' className='computer__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandScissors} title='Scissors' className='computer__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandLizard} title='Lizard' className='computer__choice game__choice'></FontAwesomeIcon>
                <FontAwesomeIcon icon={faHandSpock} title='Spock' className='computer__choice game__choice'></FontAwesomeIcon>
            </div>

            <FontAwesomeIcon icon={faSyncAlt} className='spockRockGame__reset'></FontAwesomeIcon>

            <div className='spockRockGame__result__container'>
                <h3 className='spockRockGame__result__text'>

                </h3>
            </div>
        </div>
    </main>
)}

export default SpockRockGame;