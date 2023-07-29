import React, { useState, useEffect } from 'react'
import TennisBallImg from '../assets/tennisball.webp'

const TennisBall = ({ cursorPos }) => {
  const [ballPos, setBallPos] = useState({ x: 0, y: 0 });
  const [ballScale, setBallScale] = useState(1);

  // Update ball position and scale based on cursor position
  useEffect(() => {
    const dx = cursorPos.x - ballPos.x;
    const dy = cursorPos.y - ballPos.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) { // Adjust this value as necessary
      // Collision with cursor
      setBallScale(0.6);
      
      // Set new trajectory for the ball
      setBallPos(prevPos => ({
        x: prevPos.x + dx * 0.05, // Adjust these values as necessary
        y: prevPos.y + dy * 0.05,
      }));
    } else {
      // No collision
      setBallScale(1);
      
      // Move ball towards cursor
      setBallPos(prevPos => ({
        x: prevPos.x + dx * 0.01, // Adjust these values as necessary
        y: prevPos.y + dy * 0.01,
      }));
    }
  }, [cursorPos]);

  const [scaledBallSize, setScaledBallSize] = useState(ballSize);

// Scale function
const scaleBall = (scale) => {
  setScaledBallSize(ballSize * scale);
};

// Use the scale function whenever you want to scale the ball. For instance, when the ball hits the cursor.
// scaleBall(0.6) or scaleBall(1) 


  return (
    <img 
      src={TennisBallImg} 
      style={{ 
        position: 'fixed', 
        width: `${scaledBallSize}px`, 
        height: `${scaledBallSize}px`,
        left: ballPos.x, 
        top: ballPos.y, 
        transform: `translate(-50%, -50%)`,
        transition: '0.1s linear',
      }} 
    />
  );
};

export default TennisBall;