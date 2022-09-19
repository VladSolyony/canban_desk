import React from 'react';
import Title from '../Title/Title';
import Card from '../Card/Card';
import InputItem from '../Input/InputItem';
import './List.scss';
import { v4 as uuid } from "uuid";
import { Droppable} from 'react-beautiful-dnd'

export default function List({ list }) {

    // const cards = JSON.parse(localStorage.getItem('cards'));

    // if (cards === null) {
    //     return(
    //         <div className='list'>
    //         <Title title={list.title}/>
    //         <InputItem listId={list.id}/>
    //         </div>
    //     );
    // }
    const key = uuid();

    return(
        <div className='list' key={key}>
            <Title title={list.title} listId={list.id}/>
                <Droppable droppableId={list.id}>
                    {(provided) => (
                        <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {list.cards.map((card, index) => (
                                <Card key={card.id} card={card} index={index}/>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            <InputItem listId={list.id} type={'card'}/>
        </div>
    );
}