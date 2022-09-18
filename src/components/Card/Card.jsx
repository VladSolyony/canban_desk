import React from 'react';
import './Card.scss'

function Card({ card }) {
    return(
        <div>
            <h2 className='card'>
                {card.title}
            </h2>
        </div>
    );
}

export default Card;