// Confetti.js
import React, { useEffect } from 'react';
import './Confetti.css';

const Confetti = ({ isActive }) => {
  useEffect(() => {
    if (isActive) {
      const confettiContainer = document.getElementById('confetti-container');

      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;

        // Generate a random color
        const randomColor = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`;
        confetti.style.backgroundColor = randomColor;

        confettiContainer.appendChild(confetti);

        confetti.addEventListener('animationend', () => {
          confetti.remove();
        });
      }
    }
  }, [isActive]);

  return <div id="confetti-container" className={isActive ? 'active' : ''}></div>;
};

export default Confetti;
