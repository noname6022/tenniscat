import React from 'react'
import '../index.css'
import TennisCat from '../assets/Tenniscat.webp'
import '../styles/StartScreenStyles.css'
export const StartScreen = () => {
  return (
    <section className='StartScreenWrapper'>
      <div className='StartScreenContainer'>
      <div><h1 className='StartScreenTitle'>Tennis cat</h1></div>
      <div><img className='CatSize' src={TennisCat}/></div>
      <div><button className='StartGameBtn'>Start game!</button></div>
      </div>
    </section>
  )
  } 
  
  export default StartScreen
