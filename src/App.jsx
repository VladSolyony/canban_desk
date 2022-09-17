import React, { useState } from 'react';
import List from './components/List/List'
import './App.css';
import { CardTitleContext } from './utils/Contexts';

const cards = [
  {
      id: 'card-1',
      content: 'Learning react'
  },
  {
      id: 'card-2',
      content: 'Search a job'
  },
  {
      id: 'card-3',
      content: 'Go to university'
  }
];

const data = {
  lists: {
      'list-1' : {
          id: 'list-1',
          title: '123',
          cards,
      },
  },
  listIds: ['list-1'],
};

function App() {
  const addCard = (title, listId) => {
    console.log(title, listId);
  };
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
