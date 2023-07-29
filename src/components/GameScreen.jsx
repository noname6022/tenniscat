import React, { useState, useEffect, useRef } from 'react';
import '../index.css';
import TennisCat from '../assets/Tenniscat.webp';
import Rocket from '../assets/player-tennis-rocket.webp';
import Song from '../assets/Tennis - Results - Wii Sports Music Extended.ogg';
import TennisBallImg from '../assets/tennisball.webp';
import CatTennisRocket from '../assets/rocketforcat.webp';
import '../styles/GameScreenStyles.css';

const TennisBall = ({ scale }) => {
  const ballStyle = {
    position: 'absolute',
    width: `${13 * scale}vw`,
    height: `${13 * scale}vw`,
    top: `${(100 - 13 * scale) / 2}%`,
    left: `${(100 - 13 * scale) / 2}%`,
    zIndex: 2,
  };

  return (
    <img
      src={TennisBallImg}
      alt="Tennis Ball"
      style={ballStyle}
    />
  );
};

const GameScreen = () => {
  const [seconds, setSeconds] = useState(0);
  const [ballScale, setBallScale] = useState(0.3);
  const [scalingDirection, setScalingDirection] = useState(1);
  const [catRacketPos, setCatRacketPos] = useState({ x: 90, y: 40 });
  const [rocketDirection, setRocketDirection] = useState(-1);
  const [moveCatRocket, setMoveCatRocket] = useState(false);
  const cursorRef = useRef();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const newBallScale = ballScale + (0.01 * scalingDirection);

      if (newBallScale <= 0.3 || newBallScale >= 1) {
        setScalingDirection((prevDirection) => -prevDirection);
      }

      setBallScale(newBallScale);
    }, 20);

    return () => clearInterval(intervalId);
  }, [ballScale, scalingDirection]);

  useEffect(() => {
    const moveCursor = (event) => {
      const x = event.clientX;
      const y = event.clientY;

      cursorRef.current.style.left = `${x}px`;
      cursorRef.current.style.top = `${y}px`;
    };

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('touchmove', moveCursor);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('touchmove', moveCursor);
    };
  }, []);

  useEffect(() => {
    if (ballScale <= 0.4) {
      setMoveCatRocket(true);
    } else {
      setMoveCatRocket(false);
    }
  }, [ballScale]);

  useEffect(() => {
    if (moveCatRocket) {
      const intervalId = setInterval(() => {
        setCatRacketPos((prevPos) => {
          const newX = prevPos.x + rocketDirection * 2;
          const constrainedX = Math.min(Math.max(newX, 0), 100 - 9);
          if (constrainedX === 0 || constrainedX === 100 - 9) {
            setRocketDirection((prevDirection) => -prevDirection);
          }
          return { ...prevPos, x: constrainedX };
        });
      }, 20);
      return () => clearInterval(intervalId);
    }
  }, [moveCatRocket]);

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

  return (
    <section className='GameScreenWrapper'>
      <TennisBall scale={ballScale} />
      <div className='GameScreenContainer'>
        <div><button className='StopGameBtn'>Stop game!</button></div>
        <div><h1 className='GameScreenTitle'>{formatTime(seconds)}</h1></div>
        <div className='PlayBlock'>
          <img className='CatSize' src={TennisCat} alt="Cat" />
          <img className='CatRocket' src={CatTennisRocket} alt="Cat Rocket" style={{ left: `${catRacketPos.x}vw` }} />
        </div>
        <img
          ref={cursorRef}
          src={Rocket}
          alt="Rocket Cursor"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            width: '12vw',
            pointerEvents: 'none',
            zIndex: 2,
            transform: 'translate(-50%, -20%)',
          }}
        />
      </div>
      <audio src={Song} autoPlay loop />
    </section>
  );
};

export default GameScreen;
