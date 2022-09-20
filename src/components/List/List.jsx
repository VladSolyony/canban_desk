import React, {useState} from 'react';
import Title from '../Title/Title';
import Card from '../Card/Card';
import InputItem from '../Input/InputItem';
import './List.scss';
import { Droppable, Draggable } from 'react-beautiful-dnd';

export default function List({ list, index }) {

    const [state, setState] = useState(list.cards)
    
    const removeItem = id => {
        console.log(list.cards)
       setState(prevState => prevState.filter(el => el.cards.id !== id))
    }
    return(
        <Draggable draggableId={list.id} index={index} >
            {(provided) => (
            <div {...provided.draggableProps} ref={provided.innerRef}>
                <div className='list' {...provided.dragHandleProps}>
                <Title title={list.title} listId={list.id} />
                    <Droppable droppableId={list.id}>
                        {(provided) => (
                            <div
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {list.cards.map((card, index) => (
                                    <Card key={card.id} card={card} index={index} listId={list.id} removeItem={removeItem}/>
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