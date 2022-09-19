import React, { useState } from 'react';
import List from './components/List/List'
import './App.scss';
import { CardTitleContext } from './utils/Contexts';
import { v4 as uuid } from "uuid";
import InputItem from './components/Input/InputItem';
import {DragDropContext} from 'react-beautiful-dnd'

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
    const {destination, source, draggableId} = result;
    const sourceList = data.lists[source.droppableId];
    const destinationlist = data.lists[destination.droppableId];
    const draggingCard = sourceList.cards.filter((card) => card.id === draggableId)[0];

    if (!destination) {
      return;
    }
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
  }
    return (
    <CardTitleContext.Provider value={{ addCard, addList, updateListTitle }}>
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="root">
            {data.listIds.map((listId) => {
            const list = data.lists[listId];
            return <List list={list} key={listId}/>;
            })}
            <InputItem type={'list'}/>
          </div>
        </DragDropContext>  
    </CardTitleContext.Provider>
  );
}

export default App;
