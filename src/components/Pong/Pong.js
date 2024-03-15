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
    const [paddleBottomX, setPaddleBottomX] = useState(225);
    const [paddleTopX, setPaddleTopX] = useState(225);
    const [playerMoved, setPlayerMoved] = useState(false);
    const [paddleContact, setPaddleContact] = useState(false);

    const [ballX, setBallX] = useState(250);
    const [ballY, setBallY] = useState(350);
    const ballRadius = 5;

    const [speedY, setSpeedY] = useState(null);
    const [speedX, setSpeedX] = useState(null);
    const [trajectoryX, setTrajectoryX] = useState(null);
    const [computerSpeed, setComputerSpeed] = useState(null);

    const [playerScore, setPlayerScore] = useState(0);
    const [computerScore, setComputerScore] = useState(0);
    const winningScore = 7;
    const [isGameOver, setIsGameOver] = useState(true);
    const [isNewGame, setIsNewGame] = useState(true);


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
        setBallX(width / 2);
        setBallY(height / 2);
        setSpeedY(-3);
        setPaddleContact(false);
    }

    function ballMove() {
        // Vertical Speed
        setBallY(prevBallY => prevBallY - speedY);

        // Horizontal Speed
        if (playerMoved && paddleContact) {
            setBallX(prevBallX => prevBallX + speedX);
        }
    }

    function ballBoundaries() {
        // Bounce off Left Wall
        if (ballX < 0 && speedX < 0) {
            setSpeedX(prevSpeedX => -prevSpeedX);
        }
        // Bounce off Right Wall
        if (ballX > width && speedX > 0) {
            setSpeedX(prevSpeedX => -prevSpeedX);
        }
        // Bounce off player paddle (bottom)
        if (ballY > height - paddleDiff) {
            if (ballX > paddleBottomX && ballX < paddleBottomX + paddleWidth) {
                setPaddleContact(true);
                // Add Speed on Hit
                if (playerMoved) {
                    setSpeedY(prevSpeedY => prevSpeedY - 1);
                    // Max Speed
                    if (speedY < -5) {
                        setSpeedY(-5);
                        setComputerSpeed(6);
                    }
                }
                setSpeedY(prevSpeedY => -prevSpeedY);
                setTrajectoryX(ballX - (paddleBottomX + paddleDiff));
                setSpeedX(prevSpeedX => prevSpeedX * 0.3);
            } else if (ballY > height) {
                // Reset Ball, add to Computer Score
                ballReset();
                setComputerScore(prevComputerScore => prevComputerScore + 1);
            }
        }
        // Bounce off computer paddle (top)
        if (ballY < paddleDiff) {
            if (ballX > paddleTopX && ballX < paddleTopX + paddleWidth) {
                // Add Speed on Hit
                if (playerMoved) {
                    setSpeedY(prevSpeedY => prevSpeedY + 1);
                    // Max Speed
                    if (speedY > 5) {
                        setSpeedY(5);
                    }
                }
                setSpeedY(prevSpeedY => -prevSpeedY);
            } else if (ballY < 0) {
                // Reset Ball, add to Player Score
                ballReset();
                setPlayerScore(prevPlayerScore => prevPlayerScore + 1);
            }
        }
    }

    function computerAI() {
        if (playerMoved) {
            if (paddleTopX + paddleDiff < ballX) {
                setPaddleTopX(prevPaddleTopX => prevPaddleTopX + computerSpeed);

            } else {
                setPaddleTopX(prevPaddleTopX => prevPaddleTopX - computerSpeed);
            }
        }
    }

    function gameOver() {
        if (playerScore === winningScore || computerScore === winningScore) {
            setIsGameOver(true);
            // Set Winner
            const winner = playerScore === winningScore ? 'Player 1' : 'Computer';
            //showGameOverEl(winner);
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
        setIsGameOver(false);
        setIsNewGame(false);
        setPlayerScore(0);
        setComputerScore(0);
        ballReset();
        createCanvas();
        animate();

        canvasRef.current.addEventListener('mousemove', (e) => {
            setPlayerMoved(true);
            console.log("Mouse moved!");
            console.log("Mouse X:", e.clientX);
            console.log("Canvas Position:", canvasPosition);
            console.log("Paddle Diff:", paddleDiff);
            const newPaddleBottomX = e.clientX - canvasPosition - paddleDiff;
            if (newPaddleBottomX < paddleDiff) {
                setPaddleBottomX(0);
            } else if (newPaddleBottomX > width - paddleWidth) {
                setPaddleBottomX(width - paddleWidth);
            } else {
                console.log("New Paddle Bottom X:", newPaddleBottomX);
                setPaddleBottomX(newPaddleBottomX);
            }
            canvasRef.current.style.cursor = 'none';
        });
        

    }

    useEffect(() => {

        startGame();

    }, [ ])

    return (
        <main className='pong'>

            <canvas
                ref={canvasRef}
            />

        </main>
    )
}

export default Pong;