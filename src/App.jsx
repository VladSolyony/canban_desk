import React, { useState } from 'react';
import List from './components/List/List'
import './App.scss';
import Contexts from './utils/Contexts';
import { v4 as uuid } from "uuid";
import InputItem from './components/Input/InputItem';
import {DragDropContext, Droppable} from 'react-beautiful-dnd'

function App() {

  const initData = {
    lists: {
        'list-1' : {
            id: 'list-1',
            title: 'Editable Title',
            cards: [],
        },
        'list-2' : {
          id: 'list-2',
          title: 'Doing',
          cards: [],
      },
    },
    listIds: ['list-1', 'list-2'],
  };

  const [data, setData] = useState(initData);

  const addCard = (title, listId) => {
    const newCardId = uuid();
    const newCard = {
      id: newCardId,
      title,
    };

    const list = data.lists[listId];
    list.cards = [...list.cards, newCard]

    const newState = {
      ...data,
      lists:{
        ...data.lists,
        [listId]: list,
      }
    };
    setData(newState);
  }

  const addList = (title) => {
    const newListId = uuid();
    const newList = {
      id: newListId,
      title,
      cards: [],
    };

    const newState = {
      listIds:[...data.listIds, newListId],
      lists:{
        ...data.lists,
        [newListId]:newList
      } 
    }
    setData(newState);
  }

  const updateListTitle = (title, listId) => {
    const list = data.lists[listId];
    list.title = title;

    const newState = {
      ...data, 
      lists: {
        ...data.lists,
        [listId]: list
      }
    }

    setData(newState)
  };

  // const removeCard = (title, listId) => {

  //   const list = data.lists[listId];
  //   var updatedList = list.cards 
  //   updatedList
  //   const newState = {
  //     ...data,
  //     lists:{
  //       ...data.lists,
  //       [listId]: list,
  //     }
  //   };
  //   setData(newState);
  // }


  const onDragEnd = (result) => {
    const {destination, source, draggableId, type} = result;

    if (!destination) {
      return;
    }

    if(type === "list") {
      const newListIds = data.listIds;
      newListIds.splice(source.index, 1);
      newListIds.splice(destination.index, 0, draggableId);
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destinationlist = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0];

    if (source.droppableId === destination.droppableId) {
      sourceList.cards.splice(source.index, 1);
      destinationlist.cards.splice(destination.index, 0, draggingCard)
      const newState = {
        ...data,
        lists:{
          ...data.lists,
          [sourceList.id]: destinationlist,
        },
      };
      setData(newState);
    } else {
      sourceList.cards.splice(source.index, 1)
      destinationlist.cards.splice(destination.index, 0, draggingCard)

      const newState = {
        ...data,
        lists: {
          ...data.lists,
          [sourceList.id]:sourceList,
          [destinationlist.id]:destinationlist,
        },
      };
      setData(newState);
    }
  };
    return (
    <Contexts.Provider value={{ addCard, addList, updateListTitle }}>
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="app" type="list" direction="horizontal" >
            {(provided) => (
              <div className="root" ref={provided.innerRef} {...provided.droppableProps}>
                {data.listIds.map((listId, index) => {
                const list = data.lists[listId];
                return <List list={list} key={listId} index={index}/>;
                })}
                <InputItem type='list'/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>  
    </Contexts.Provider>
  );
}

export default App;
