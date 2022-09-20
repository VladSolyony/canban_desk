import React, { useState } from 'react';
import List from './components/List/List'
import './App.scss';
import Contexts from './utils/Contexts';
import { v4 as uuid } from "uuid";
import InputItem from './components/Input/InputItem';
import {DragDropContext, Droppable} from 'react-beautiful-dnd';
import Socials from './components/Socials/Socials';
import Header from './components/Header/Header';

function App() {

  const initData = {
    lists: {
        'list-1' : {
            id: 'list-1',
            title: 'Editable Title',
            cards: [],
        },
    },
    listIds: ['list-1'],
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


  const removeCard = (listId, index) => {
    const list = data.lists[listId];
    const cardList = list.cards;
    const result = []

    for (var key in cardList) {
      if(key != index) {
        result.push(list.cards[key]);
      }
    }

    list.cards = result

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

  const removeList = (listId) => {
    const listIdsArray = [];    
    const result = {};
    const ids = data.listIds;
    const listsArray = data.lists;
    
    for (let i = 0; i < ids.length; i++) {
      if(ids[i] != listId) {
        listIdsArray.push(ids[i]);
      }
    }

    for (var key in listsArray) {
      if(key != listId) {
        result[key] = data.lists[key];
      }
    }

    const newState = {
      listIds: listIdsArray,
      lists: result,
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
    <Contexts.Provider value={{ addCard, addList, updateListTitle, removeCard, removeList }}>
        <Header />
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="app" type="list" direction="horizontal" >
            {(provided) => (
              <div className="app__container" ref={provided.innerRef} {...provided.droppableProps}>
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
        <Socials />
    </Contexts.Provider>
  );
}

export default App;
