import React, { useState, useContext } from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import { CardTitleContext } from '../../utils/Contexts'
import './InputCard.scss';

function InputCard({ setOpen, listId }) {
    const { addCard } = useContext(CardTitleContext);
    const [cardTitle, setCardTitle] = useState('');

    const handleOnChange = (e) => {
        setCardTitle(e.target.value);
    };

    const handleAddBtn = () => {
        addCard(cardTitle, listId);
        setOpen(false);
    };

    return(
        <div>
            <div className='input-card'>
                <input 
                    onChange={handleOnChange}
                    value={cardTitle}
                    placeholder='Enter a title...' 
                    className='input-card__input' 
                    autoFocus/>
            </div>
            <div className='button-container'>
                <button className='button-container__add-button' onClick={handleAddBtn}>
                    ADDCARD
                </button>
                <div className='button-container__clear-button' onClick={() => setOpen(false)}>
                    <ClearIcon />
                </div>
            </div>
        </div>
    );
}

export default InputCard;