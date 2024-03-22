import { useEffect, useRef, useState } from 'react';
import './Pong.css';

function Pong() {
    const canvasRef = useRef(null);
    const contextRef = useRef(null);

    const width = 500;
    const height = 700;

    const screenWidth = window.screen.width;

    const canvasPosition = window.innerWidth / 2 - width / 2;

    const paddleHeight = 10;
    const paddleWidth = 50;
    const paddleDiff = 25;

    let paddleBottomX = 225;
    let paddleTopX = 225;
    let playerMoved = false;
    let paddleContact = false;

    let ballX = 250;
    let ballY = 350;
    const ballRadius = 5;

    let speedY = -1;
    let speedX = 0;
    let trajectoryX = 0;
    let computerSpeed = 3;

    let playerScore = 0;
    let computerScore = 0;
    const winningScore = 7;
    let isGameOver = true;
    let isNewGame = true;

    

    function renderCanvas() {
        const canvas = canvasRef.current;
        const context = contextRef.current;

        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);

        context.fillStyle = 'white';

        context.fillRect(paddleBottomX, height - 20, paddleWidth, paddleHeight);

        context.fillRect(paddleTopX, 10, paddleWidth, paddleHeight);

        context.beginPath();
        context.setLineDash([4]);
        context.moveTo(0, 350);
        context.lineTo(500, 350);
        context.strokeStyle = 'grey';
        context.stroke();

        context.beginPath();
        context.arc(ballX, ballY, ballRadius, 2 * Math.PI, false);
        context.fillStyle = 'white';
        context.fill();

        context.font = '32px Courier New';
        context.fillText(playerScore, 20, canvas.height / 2 + 50);
        context.fillText(computerScore, 20, canvas.height / 2 - 30);
    }

    function createCanvas() {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        contextRef.current = context;
        canvas.width = width;
        canvas.height = height;
        renderCanvas();
    }

    function ballReset() {
        ballX = width / 2;
        ballY = height / 2;
        speedY = -3;
        paddleContact = false;
    }

    function ballMove() {
        // Vertical Speed
        ballY -= speedY;

        // Horizontal Speed
        if (playerMoved && paddleContact) {
            ballX += speedX;
        }
    }

    function ballBoundaries() {
        // Bounce off Left Wall
        if (ballX < 0 && speedX < 0) {
            speedX = -speedX;
        }
        // Bounce off Right Wall
        if (ballX > width && speedX > 0) {
            speedX = -speedX;
        }
        // Bounce off player paddle (bottom)
        if (ballY > height - paddleDiff) {
            if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
                paddleContact = true;
                // Add Speed on Hit
                if (playerMoved) {
                    speedY -= 1;
                    // Max Speed
                    if (speedY < -5) {
                        speedY = -5;
                        computerSpeed = 6;
                    }
                }
                speedY = -speedY;
                trajectoryX = ballX - (paddleBottomX + paddleDiff);
                speedX = trajectoryX * 0.3;
            } else if (ballY > height) {
                // Reset Ball, add to Computer Score
                ballReset();
                computerScore++;
            }
        }
        // Bounce off computer paddle (top)
        if (ballY < paddleDiff) {
            if (ballX > paddleTopX && ballX < paddleTopX + paddleWidth) {
                // Add Speed on Hit
                if (playerMoved) {
                    speedY += 1;
                    // Max Speed
                    if (speedY > 5) {
                        speedY = 5;
                    }
                }
                speedY = -speedY;
            } else if (ballY < 0) {
                // Reset Ball, add to Player Score
                ballReset();
                playerScore++;
            }
        }
    }

    function computerAI() {
        if (playerMoved) {
            if (paddleTopX + paddleDiff < ballX) {
                paddleTopX += computerSpeed;
            } else {
                paddleTopX -= computerSpeed;
            }
        }
    }

   
    function handlePlayAgain() {
        canvasRef.current.removeEventListener('click', handlePlayAgain);
        startGame();
    }
    
    function renderGameOver(winner) {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
    
        context.font = 'bold 40px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(`${winner} Wins!`, width / 2, height / 2 - 50);
    

        context.fillStyle = 'green';
        context.fillRect(width / 2 - 100, height / 2 + 20, 200, 50);
    
        context.font = 'bold 20px Arial';
        context.fillStyle = 'white';
        context.fillText('Play Again', width / 2, height / 2 + 55);
    
        canvas.addEventListener('click', handlePlayAgain);
    }

    function playAgainButton(context, x, y, text, onClick) {
        context.fillStyle = 'rgb(195, 195, 195)';
        context.fillRect(x, y, 200, 50);
    
        context.font = 'bold 20px Arial';
        context.fillStyle = 'black';
        context.textAlign = 'center';
        context.fillText(text, x + 100, y + 30);
    
        canvasRef.current.addEventListener('click', onClick);
    }
    
    function renderGameOver(winner) {
        const canvas = canvasRef.current;
        const context = contextRef.current;
        context.clearRect(0, 0, width, height);
        context.fillStyle = 'black';
        context.fillRect(0, 0, width, height);
    
        context.font = 'bold 40px Arial';
        context.fillStyle = 'white';
        context.textAlign = 'center';
        context.fillText(`${winner}`, width / 2, height / 2 - 50);
    
        playAgainButton(context, width / 2 - 100, height / 2 + 20, 'Play Again', handlePlayAgain);
    }
    

    function handlePlayAgain() {
        canvasRef.current.removeEventListener('click', handlePlayAgain);
        startGame();
    }

    function gameOver() {
        if (playerScore === winningScore || computerScore === winningScore) {
            isGameOver = true;
            const winner = playerScore === winningScore ? 'You Win!' : 'Computer Wins!';
            renderGameOver(winner);
        }
    }

    function animate() {
        renderCanvas();
        ballMove();
        ballBoundaries();
        computerAI();
        gameOver();
        if (!isGameOver) {
            window.requestAnimationFrame(animate);
        }
    }

    function startGame() {
        isGameOver = false;
        isNewGame = false;
        playerScore = 0;
        computerScore = 0;
        ballReset();
        createCanvas();
        animate();

        canvasRef.current.addEventListener('mousemove', (e) => {
            playerMoved = true;
            const newPaddleBottomX = e.clientX - canvasPosition - paddleDiff;
            if (newPaddleBottomX < paddleDiff) {
                paddleBottomX = 0;
            } else if (newPaddleBottomX > width - paddleWidth) {
                paddleBottomX = width - paddleWidth;
            } else {
                paddleBottomX = newPaddleBottomX;
            }
            if (!isGameOver) {
                canvasRef.current.style.cursor = 'none';
            } else {
                canvasRef.current.style.cursor = 'ponter';
            }
        });
    }

    useEffect(() => {
        startGame();
    }, []);

    return (
        <main className='pong'>
            <canvas ref={canvasRef} />
        </main>
    );
}

export default Pong;
