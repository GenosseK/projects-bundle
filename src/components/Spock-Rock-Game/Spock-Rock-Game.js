import React, { useState } from 'react';
import {
  faHandLizard,
  faHandPaper,
  faHandRock,
  faHandScissors,
  faHandSpock,
} from '@fortawesome/free-regular-svg-icons';
import { faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { startConfetti, stopConfetti } from './confetti';
import './Spock-Rock-Game.css';

const choices = ['Rock', 'Paper', 'Scissors', 'Lizard', 'Spock'];

function SpockRockGame() {
  const [userScore, setUserScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  const [userChoice, setUserChoice] = useState('');
  const [computerChoice, setComputerChoice] = useState('');
  const [resultText, setResultText] = useState('');

  const resetGame = () => {
    setUserChoice('');
    setComputerChoice('');
    setResultText('');
    setUserScore(0);
    setComputerScore(0);
    stopConfetti();
  };

  const handlePlayerChoice = (choice) => {
    setUserChoice(choice);
    const computerRandomChoice = choices[Math.floor(Math.random() * choices.length)];
    setComputerChoice(computerRandomChoice);

    // Determine the winner
    if (choice === computerRandomChoice) {
      setResultText("It's a tie!");
      stopConfetti();
    } else if (
      (choice === 'Rock' && (computerRandomChoice === 'Scissors' || computerRandomChoice === 'Lizard')) ||
      (choice === 'Paper' && (computerRandomChoice === 'Rock' || computerRandomChoice === 'Spock')) ||
      (choice === 'Scissors' && (computerRandomChoice === 'Paper' || computerRandomChoice === 'Lizard')) ||
      (choice === 'Lizard' && (computerRandomChoice === 'Spock' || computerRandomChoice === 'Paper')) ||
      (choice === 'Spock' && (computerRandomChoice === 'Scissors' || computerRandomChoice === 'Rock'))
    ) {
      setUserScore((prevScore) => prevScore + 1);
      setResultText('You win!');
      startConfetti();
    } else {
      setComputerScore((prevScore) => prevScore + 1);
      setResultText('You lose!');
      stopConfetti();
    }
  };

  return (
    <main className='spockRockGame'>
      <div className='spockRockGame__container'>
        <div className='spockRockGame__header__container'>
          <h1 className='spockRockGame__header'>Rock Paper Scissors Lizard Spock</h1>
        </div>

        <div className='spockRockGame__player__container'>
          <h2 className='spockRockGame__player__title human'>
            You - <span className='player__score'>{userScore}</span>
            <span className='player__choice-title'>{userChoice && ` --- ${userChoice}`}</span>
          </h2>
          {choices.map((choice) => (
            <FontAwesomeIcon
              key={choice}
              icon={choice === 'Rock' ? faHandRock : choice === 'Paper' ? faHandPaper : choice === 'Scissors' ? faHandScissors : choice === 'Lizard' ? faHandLizard : faHandSpock}
              title={choice}
              className={`player__choice game__choice ${choice === userChoice && 'selected'}`}
              onClick={() => handlePlayerChoice(choice)}
            />
          ))}
        </div>

        <div className='spockRockGame__player__container'>
          <h2 className='spockRockGame__player__title computer'>
            Computer - <span className='computer__score'>{computerScore}</span>
            <span className='player__choice-title'>{computerChoice && ` --- ${computerChoice}`}</span>
          </h2>
          {choices.map((choice) => (
            <FontAwesomeIcon
              key={choice}
              icon={choice === 'Rock' ? faHandRock : choice === 'Paper' ? faHandPaper : choice === 'Scissors' ? faHandScissors : choice === 'Lizard' ? faHandLizard : faHandSpock}
              title={choice}
              className={`computer__choice game__choice ${choice === computerChoice && 'selected'}`}
            />
          ))}
        </div>

        <FontAwesomeIcon icon={faSyncAlt} className='spockRockGame__reset' onClick={resetGame} />

        <div className='spockRockGame__result__container'>
          <h3 className='spockRockGame__result__text'>{resultText}</h3>
        </div>
      </div>
    </main>
  );
}

export default SpockRockGame;
