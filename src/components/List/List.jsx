import React from 'react';
import Title from '../Title/Title';
import Card from '../Card/Card';
import InputItem from '../Input/InputItem';
import './List.scss'

export default function List({ list }) {
    return(
        <div className='list'>
            <Title title={list.title}/>
            {list.cards.map((card) => (
                <Card key={card.id} card={card}/>
            ))}
            <InputItem listId={list.id}/>
        </div>
    );
}