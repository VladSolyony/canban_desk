import React from 'react';
import './Card.scss'

function Card({ card }) {
    return(
        <div>
            <h2 className='card'>
                {card.content}
            </h2>
        </div>
    );
}

export default Card;