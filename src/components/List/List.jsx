import React from 'react';
import Title from '../Title/Title';
import Card from '../Card/Card';
import InputItem from '../Input/InputItem';
import './List.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { v4 as uuid } from "uuid";

export default function List({ list, index }) {
    const id = uuid();
    return(
        <Draggable draggableId={list.id} index={index} >
            {(provided) => (
            <div {...provided.draggableProps} ref={provided.innerRef}>
                <div className='list' {...provided.dragHandleProps}>
                <Title title={list.title} listId={list.id} />
                    <Droppable droppableId={list.id} key={id}>
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
                <InputItem listId={list.id} type='card'/>
                </div>
            </div>
            )}
        </Draggable>  
    );
}