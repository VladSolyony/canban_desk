import React, { useState, useEffect } from 'react';
import List from './components/List/List'
import './App.css';
import { CardTitleContext } from './utils/Contexts';
import { v4 as uuid } from "uuid";

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

    const res = JSON.parse(localStorage.getItem('cards'))
    var listObj = {};
    if (res === null) {
        let itemsArray = []
        listObj.id = newCardId;
        listObj.title = title
        itemsArray.push(listObj)
        localStorage.setItem('cards', JSON.stringify(itemsArray));
    } else {
        listObj.id = newCardId;
        listObj.title = title
        res.push(listObj)
        localStorage.setItem('cards', JSON.stringify(res));
    }
  };

  
  useEffect(() => {
    const init = JSON.parse(localStorage.getItem('cards'))
    if ( init === null ) {

      var cardsObj = {};
      cardsObj = [];
    
      var dataObj = {};
      dataObj.lists = {};
      dataObj.listIds = [];
    
    
      localStorage.setItem('cards', JSON.stringify(cardsObj))
      localStorage.setItem('data', JSON.stringify(dataObj)) 
    }
  }, []);

  return (
    <CardTitleContext.Provider value={{ addCard }}>
          <div>
            {data.listIds.map((listId) => {
            const list = data.lists[listId];
            return <List list={list} key={listId}/>;
            })}
          </div>
    </CardTitleContext.Provider>
  );
}

export default App;
