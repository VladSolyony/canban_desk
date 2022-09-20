import React, { useState } from 'react'
import './Header.scss'
import BurguerButton from '../BurgerButton/BurgerButton'

function Header() {

  const [clicked, setClicked] = useState(false)
  const handleClick = () => {
    setClicked(!clicked)
  }
  return (
    <>
      <div className='nav-container'>
        <h2 className='nav-container__header'>Welcome on <span>board</span>!</h2>

        <div className='burger'>
          <BurguerButton clicked={clicked} handleClick={handleClick} />
        </div>
        <div className={`initial ${clicked ? ' active' : ''}`}>        
        <div className={`links ${clicked ? 'active' : ''}`}>
          <a onClick={handleClick} href="https://github.com/VladSolyony">GitHub</a>
          <a onClick={handleClick} href="https://t.me/+79204682898">Telegram</a>
          <a onClick={handleClick} href="mailto: solyonyvlad@gmail.com">Mail</a>
        </div></div>
      </div>
    </>
  )
}

export default Header