import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import TennisCat from '../assets/Tenniscat.webp';
import Rocket from '../assets/player-tennis-rocket.webp';
import Song from '../assets/Tennis - Results - Wii Sports Music Extended.mp3';
import CatRocketSound from '../assets/CatRocket.mp3'; // Make sure to import the correct file
import TennisBallImg from '../assets/tennisball.webp';
import CatTennisRocket from '../assets/rocketforcat.webp';
import '../styles/GameScreenStyles.css';
import GameOverScreen from './GameOverScreen';

const TennisBall = ({ scale, left }) => {
  const topPosition = window.innerWidth < 600
    ? `${(203 - 23 * scale) / 2.7}vmin`
    : `${(100 - 23 * scale) / 2.7}vmin`;

  const scaleTime = window.innerWidth < 600
    ? 'left 0.8s ease'
    : 'left 1s ease';

  const ballStyle = {
    position: 'absolute',
    width: `${12 * scale}vw`,
    height: `${12 * scale}vw`,
    top: topPosition,
    marginLeft: `${(0 - 13 * scale) / 2}%`,
    left: `${left}%`,
    zIndex: 2,
    transition: scaleTime,
  };

  return (
    <img
      src={TennisBallImg}
      alt="Tennis Ball"
      id="BallPoint"
      style={ballStyle}
      className='BallImgStyles'
    />
  );
};

const GameScreen = () => {
  
  const [seconds, setSeconds] = useState(0);
  const [ballScale, setBallScale] = useState(0.3);
  const [scalingDirection, setScalingDirection] = useState(1.4);
  const [catRocketLeft, setCatRocketLeft] = useState(53);
  const [catRocketTop, setCatRocketTop] = useState(56);
  const [ballPosition, setBallPosition] = useState(50);
  const [gameOver, setGameOver] = useState(false);
  const [playCatRocketSound, setPlayCatRocketSound] = useState(false);
  const cursorRef = useRef();

  const handleAudioPlay = () => {
    if (!playCatRocketSound) {
      setPlayCatRocketSound(true);
    }
  };
  useEffect(() => {
    handleAudioPlay(); 
  }, []);


  useEffect(() => {
    
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newBallScale = ballScale + (0.015 * scalingDirection);
      if (newBallScale <= 0.3 || newBallScale >= 1.4) {
        setScalingDirection((prevDirection) => -prevDirection);
      }
      setBallScale(newBallScale);

      if (newBallScale >= 0.3 && newBallScale <= 1.4 && !gameOver) {
        setPlayCatRocketSound(true);
      } else {
        setPlayCatRocketSound(false);
      }

      if (window.innerWidth < 600) {
        if (scalingDirection === 1.4 && newBallScale >= 0.5 && newBallScale < 0.512) {
          setCatRocketLeft(Math.random() < 0.7 ? 15 : 58);
          const maxRightPosition = 80;
          const maxLeftPosition = 20; // Adjust this value to move the ball less to the left
          const ballMovementRange = maxRightPosition - maxLeftPosition;
          const randomPosition = Math.random() * ballMovementRange + maxLeftPosition;
          setBallPosition(randomPosition);
          setCatRocketTop(94);
        } else if (scalingDirection === -1.4 && newBallScale <= 0.5 && newBallScale > 0.388) {
          setCatRocketTop(67);
          setCatRocketLeft(36.3);
        } else if (scalingDirection === -1.4 && newBallScale <= 1.38 && newBallScale > 0.388) {
          setBallPosition(50);
        }
      } else {
        if (scalingDirection === 1.4 && newBallScale >= 0.5 && newBallScale < 0.512) {
          setCatRocketLeft(Math.random() < 0.7 ? 38 : 53);
          setBallPosition(Math.random() * 50 + 30);
          setCatRocketTop(50);
        } else if (scalingDirection === -1.4 && newBallScale <= 1.38 && newBallScale > 0.388) {
          setBallPosition(50);
        }
        if (scalingDirection === -1.4 && newBallScale <= 0.5 && newBallScale > 0.388) {
          setCatRocketTop(33);
          setCatRocketLeft(45.5);
        }
      }
    }, 20);

    return () => clearInterval(intervalId);
  }, [ballScale, scalingDirection, gameOver]);

  useEffect(() => {
    let animationFrameId;

    const checkCollision = () => {
      if (ballScale >= 1.4 && scalingDirection === -1.4) {
        const ballElement = document.getElementById('BallPoint');
        if (ballElement) {
          const ballRect = ballElement.getBoundingClientRect();
          const cursorRect = cursorRef.current.getBoundingClientRect();
          const isNotCovered =
            cursorRect.left >= ballRect.right ||
            cursorRect.right <= ballRect.left ||
            cursorRect.top >= ballRect.bottom ||
            cursorRect.bottom <= ballRect.top;

          if (isNotCovered) {
            setGameOver(true);
            return;
          }
        }
      }

      animationFrameId = requestAnimationFrame(checkCollision);
    };

    checkCollision();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [ballScale, scalingDirection]);

  useEffect(() => {
    const moveCursor = (event) => {
      if (gameOver) return;

      const x = event.clientX || event.touches[0].clientX;
      const y = event.clientY || event.touches[0].clientY;
      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('touchmove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('touchmove', moveCursor);
    };
  }, [gameOver]);

  const formatTime = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time - hours * 3600) / 60);
    const seconds = time - hours * 3600 - minutes * 60;

    return [
      hours > 0 ? hours.toString().padStart(2, '0') : null,
      minutes.toString().padStart(2, '0'),
      seconds.toString().padStart(2, '0'),
    ].filter(Boolean).join(':');
  };

  const tryAgain = () => {
    setGameOver(false);
    setSeconds(0);
    setBallScale(0.3);
    setScalingDirection(1.4);
    setCatRocketLeft(53);
    setCatRocketTop(56);
    setBallPosition(50);
  };

  const stopGame = () => {
    window.location.reload();
  };

  const handleGameOver = () => {
    if (gameOver) {
      return <GameOverScreen onTryAgain={tryAgain} />;
    }

    return (
      <section className='GameScreenWrapper'>
        <TennisBall scale={ballScale} left={ballPosition} />
        <div className='GameScreenContainer'>
          <div><button className='StopGameBtn' onClick={stopGame}>Stop game!</button></div>
          <div><h1 className='GameScreenTitle'>{formatTime(seconds)}</h1></div>
          <div className='PlayBlock'>
            <img className='CatSize' src={TennisCat} alt="Cat" />
            <img
              className='CatRocket'
              src={CatTennisRocket}
              alt="Cat Rocket"
              style={{ left: `${catRocketLeft}vw`, top: `${catRocketTop}vmin` }}
            />
          </div>
          <img
            ref={cursorRef}
            src={Rocket}
            alt="Rocket Cursor"
            className='UserRocketStyles'
          />
        </div>
        <audio src={Song} autoPlay loop />
        {playCatRocketSound && <audio src={CatRocketSound} autoPlay />}
      </section>
    );
  };

  return (
    <>
      {handleGameOver()}
    </>
  );
};

export default GameScreen;

