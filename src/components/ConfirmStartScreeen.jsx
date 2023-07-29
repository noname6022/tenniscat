import React from 'react'
import '../index.css'
import TennisCat from '../assets/Tenniscat.webp'
import '../styles/ConfirmStartScreenStyles.css'
export const ConfirmStartScreen = () => {
  return (
    <section className='ConfirmStartScreenWrapper'>
      <div className='ConfirmStartScreenContainer'>
      <div className='ConfirmStartScreenAdBlock'><p className='ConfirmStartScreenAdBlockNoAdText'>It could have been your ad, but you had<br/>
       adblock turned on</p></div>
      <div><button className='StartConfirmGameBtn'>Start!</button></div>
      </div>
    </section>
  )
  } 
  
  export default ConfirmStartScreen
