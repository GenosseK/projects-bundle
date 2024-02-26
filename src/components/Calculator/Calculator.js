import React, { useState, useEffect } from 'react';
import './Calculator.css';

function Calculator() {
    // State variables
    const [displayValue, setDisplayValue] = useState('0');
    const [firstValue, setFirstValue] = useState(0);
    const [operator, setOperator] = useState('');
    const [awaitingNextValue, setAwaitingNextValue] = useState(false);

    // Function to handle number button clicks
    const handleNumberClick = (number) => {
        if (awaitingNextValue) {
            setDisplayValue(String(number));
            setAwaitingNextValue(false);
        } else {
            setDisplayValue(prevValue => {
                return prevValue === '0' ? String(number) : prevValue + number;
            });
        }
    };

    // Function to handle decimal button click
    const handleDecimalClick = () => {
        if (awaitingNextValue) return;
        if (!displayValue.includes('.')) {
            setDisplayValue(prevValue => prevValue + '.');
        }
    };

    // Function to handle operator button clicks
    const handleOperatorClick = (op) => {
        const currentValue = Number(displayValue);
        if (operator && awaitingNextValue) {
            setOperator(op);
            return;
        }
        if (!firstValue) {
            setFirstValue(currentValue);
        } else {
            const calculation = calculate[operator](firstValue, currentValue);
            setDisplayValue(String(calculation));
            setFirstValue(calculation);
        }
        setAwaitingNextValue(true);
        setOperator(op);
    };

    // Function to reset calculator values
    const handleClearClick = () => {
        setDisplayValue('0');
        setFirstValue(0);
        setOperator('');
        setAwaitingNextValue(false);
    };

    // Calculation functions
    const calculate = {
        '/': (firstNumber, secondNumber) => firstNumber / secondNumber,
        '*': (firstNumber, secondNumber) => firstNumber * secondNumber,
        '+': (firstNumber, secondNumber) => firstNumber + secondNumber,
        '-': (firstNumber, secondNumber) => firstNumber - secondNumber,
        '=': (firstNumber, secondNumber) => secondNumber,
    };

    useEffect(() => {
        const handleKeyDown = (event) => {
            const { key } = event;
            if (!isNaN(key) || key === '.') {
                handleNumberClick(key);
            } else if (key === '+' || key === '-' || key === '*' || key === '/') {
                handleOperatorClick(key);
            } else if (key === 'Enter') {
                handleOperatorClick('=');
            } else if (key === 'Escape' || key === 'Backspace' || key === 'Delete') {
                handleClearClick();
            }
        };        

        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [handleNumberClick, handleOperatorClick, handleClearClick]);

    return (
        <main className='calculator'>
            <div className='calculator__container'>
                <div className='calculator__display'>
                    <h1 className='calculator__display__header'>{displayValue}</h1>
                </div>
                <div className='calculator__buttons'>
                    <button className='button__operator calculator__button' onClick={() => handleOperatorClick('+')}>+</button>
                    <button className='button__operator calculator__button' onClick={() => handleOperatorClick('-')}>-</button>
                    <button className='button__operator calculator__button' onClick={() => handleOperatorClick('*')}>×</button>
                    <button className='button__operator calculator__button' onClick={() => handleOperatorClick('/')}>÷</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('7')}>7</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('8')}>8</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('9')}>9</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('4')}>4</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('5')}>5</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('6')}>6</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('1')}>1</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('2')}>2</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('3')}>3</button>
                    <button className='button__decimal calculator__button' onClick={handleDecimalClick}>.</button>
                    <button className='calculator__button' onClick={() => handleNumberClick('0')}>0</button>
                    <button className='button__clear calculator__button' onClick={handleClearClick}>C</button>
                    <button className='button__equal-sign button__operator calculator__button' onClick={() => handleOperatorClick('=')}>=</button>
                </div>
            </div>
        </main>
    )
}

export default Calculator;
