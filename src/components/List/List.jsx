import React from 'react';
import Title from '../Title/Title';
import Card from '../Card/Card';
import InputItem from '../Input/InputItem';
import './List.scss'

export default function List() {
    return(
        <div className='list'>
            <Title />
            <Card />
            <Card />
            <Card />
            <InputItem />
        </div>
    );
}