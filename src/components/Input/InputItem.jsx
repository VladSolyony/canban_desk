import React, { useState } from 'react';
import InputCard from './InputCard';
import './InputItem.scss'

function InputItem({ listId, type }) {
    const [open, setOpen] = useState(false);
    return(
        <div>
            {open? (
            <InputCard setOpen={setOpen} listId={listId} type={type}/>
            ) : (
            <div className='input-item' onClick={() => setOpen(!open)}>
                <h2 className='input-item__text'>
                    {type === 'card' ? '+ Add Card' : '+ Add List Title'}
                </h2>
            </div>
            )}
        </div>
    );
}

export default InputItem;