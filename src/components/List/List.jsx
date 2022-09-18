import React from 'react';
import Title from '../Title/Title';
import Card from '../Card/Card';
import InputItem from '../Input/InputItem';
import './List.scss'

export default function List({ list }) {

    const cards = JSON.parse(localStorage.getItem('cards'));

    if (cards === null) {
        return(
            <div className='list'>
            <Title title={list.title}/>
            <InputItem listId={list.id}/>
            </div>
        );
    }

    return(
        <div className='list'>
            <Title title={list.title}/>
            {cards.map((card) => (
                <Card key={card.id} card={card}/>
            ))}
            <InputItem listId={list.id}/>
        </div>
    );
}