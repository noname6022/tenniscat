import React, { useState } from 'react';
import '../index.css';
import TennisCat from '../assets/Tenniscat.webp';
import '../styles/StartScreenStyles.css';
import ConfirmStart from './ConfirmStartScreeen'; // Import your ConfirmStart component

export const StartScreen = () => {
  // Declare new state variable "gameStarted"
  const [gameStarted, setGameStarted] = useState(false);

  // Function to handle the button click
  const startGame = () => {
    setGameStarted(true);
  }

  // If game has started, render the ConfirmStart component, else render the start screen
  return (
    gameStarted ?
      <ConfirmStart /> :
      <section className='StartScreenWrapper'>
        <div className='StartScreenContainer'>
          <div><h1 className='StartScreenTitle'>Tennis cat</h1></div>
          <div><img className='CatSize' src={TennisCat}/></div>
          <div><button className='StartGameBtn' onClick={startGame}>Start game!</button></div>
        </div>
      </section>
  )
}

export default StartScreen;
