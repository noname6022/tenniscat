import React, { useState } from 'react';
import '../index.css';
import TennisCat from '../assets/Tenniscat.webp';
import '../styles/ConfirmStartScreenStyles.css';
import GameScreen from './GameScreen'; // Import your GameScreen component

export const ConfirmStartScreen = () => {
  const [musicAllowed, setMusicAllowed] = useState(false);
  const [startGame, setStartGame] = useState(false);

  const handleStartGame = () => {
    // Here, write the code to ask user permission for playing music.
    // This is a dummy line. Replace it with actual logic.
    const userAllowed = true; 

    if (userAllowed) {
      setMusicAllowed(true);
      setStartGame(true);
    } else {
      alert("We need your permission to play music on this website.");
    }
  };

  return (
    startGame ? 
      <GameScreen /> :
      <section className='ConfirmStartScreenWrapper'>
        <div className='ConfirmStartScreenContainer'>
          <div className='ConfirmStartScreenAdBlock'>
            {musicAllowed ? (
              <div className="ad-container">
                <script
                  async
                  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9593544587794828"
                  crossorigin="anonymous"
                ></script>
                <ins
                  className="adsbygoogle"
                  style={{ display: 'block' }}
                  data-ad-client="ca-pub-9593544587794828"
                  data-ad-slot="6395005739"
                  data-ad-format="auto"
                  data-full-width-responsive="true"
                ></ins>
                <script>(adsbygoogle = window.adsbygoogle || []).push({});</script>
              </div>
            ) : (
              <>
              <p className='ConfirmStartScreenAdBlockNoAdText'>
                It could have been your ad, but you had<br/>
                adblock turned on
              </p>
                          <p className='ConfirmStartScreenAdBlockNoAdTextMobile'>
                          It could have been<br/>  your ad, but you had<br/>
                          adblock turned on
                        </p></>
            )}
          </div>
          <div>
            <button className='StartConfirmGameBtn' onClick={handleStartGame}>Start!</button>
          </div>
        </div>
      </section>
  )
}

export default ConfirmStartScreen;
