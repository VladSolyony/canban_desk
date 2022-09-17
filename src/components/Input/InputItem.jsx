import React, { useState } from 'react';
import InputCard from './InputCard';
import './InputItem.scss'

function InputItem({ listId }) {
    const [open, setOpen] = useState(false);
    return(
        <div>
            {open? (
            <InputCard setOpen={setOpen} listId={listId}/>
            ) : (
            <div className='input-item' onClick={() => setOpen(!open)}>
                <h2 className='input-item__text'>
                    + Add a card
                </h2>
            </div>
            )}
        </div>
    );
}

export default InputItem;