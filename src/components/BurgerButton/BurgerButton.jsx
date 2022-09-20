import React from 'react';
import './BurgerButton.scss';

function BurgerButton(props) {
  return (
    <div>
      <div  onClick={props.handleClick} 
            className={`icon nav-icon-5 ${props.clicked ? 'open' : ''}`}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  )
}

export default BurgerButton

