import React from 'react';
import TennisCat from '../assets/Tenniscat.webp';
import '../styles/GameOverScreenStyles.css';

export const GameOverScreen = ({ onTryAgain }) => {
  return (
    <section className='GameOverScreenWrapper'>
      <div className='GameOverScreenContainer'>
        <div><h1 className='GameOverScreenTitle'>Game Over</h1></div>
        <div><img className='CatSize' src={TennisCat}/></div>
        <div><button className='GameOverBtn' onClick={onTryAgain}>Try again</button></div>
      </div>
    </section>
  );
};

export default GameOverScreen;
