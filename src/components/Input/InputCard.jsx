import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import './InputCard.scss';

function InputCard({ setOpen }) {
    return(
        <div>
            <div className='input-card'>
                <input 
                    placeholder='Enter a title...' 
                    className='input-card__input' 
                    autoFocus 
                    onBlur={() => setOpen(false)}/>
            </div>
            <div className='button-container'>
                <button className='button-container__add-button' onClick={() => setOpen(false)}>
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