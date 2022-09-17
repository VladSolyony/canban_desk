import React, { useState } from 'react';
import './Title.scss'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function Title({ title }) {
    const [open, setOpen] = useState(false);
    return ( 
        <div>
            {open? (
            <div className='title'>
                <input 
                    value={title} 
                    className='title__input'
                    autoFocus
                    onBlur = {() => setOpen(!open)}
                />
            </div>
            ) : (
            <div className='changing-title'>
                <h1
                    className='changing-title__text'
                >
                    {title}
                </h1>
                <div className="changing-title__icon" onClick={() => setOpen(!open)}>
                    <MoreHorizIcon/>
                </div>
            </div>
            )}
        </div>
     );
}


export default Title;