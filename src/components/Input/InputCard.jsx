import React, { useState, useContext } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import Contexts from '../../utils/Contexts'
import './InputCard.scss';

function InputCard({ setOpen, listId, type }) {
    const { addCard, addList } = useContext(Contexts);
    const [title, setTitle] = useState('');

    const handleOnChange = (e) => {
        setTitle(e.target.value);
    };

    const handleAddBtn = () => {
        if (type === 'card') {
            addCard(title, listId);
            setTitle('');
            setOpen(false);
        } else {
            addList(title);
            setTitle('');
            setOpen(false);
        }
    };

    return(
        <div>
            <div className='input-card'>
                <input 
                    onChange={handleOnChange}
                    value={title}
                    placeholder={type === 'card' ? 'Enter a card title...' : 'Enter list title...'} 
                    className='input-card__input' 
                    autoFocus/>
            </div>
            <div className='button-container'>
                <button className='button-container__add-button' onClick={handleAddBtn}>
                    {type === 'card' ? 'ADD CARD' : 'ADD LIST'}
                </button>
                <div className='button-container__clear-button' onClick={() => setOpen(false)}>
                    <ClearIcon />
                </div>
            </div>
        </div>
    );
}

export default InputCard;