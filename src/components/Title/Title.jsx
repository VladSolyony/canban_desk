import React, { useState } from 'react';
import './Title.scss'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function Title() {
    const [open, setOpen] = useState(false);
    return ( 
        <div>
            {open? (
            <div className='title'>
                <input value="ToDo" 
                    className='title__input'
                    fullWidth
                    onBlur = {() => setOpen(!open)}
                />
            </div>
            ) : (
            <div className='changing-title'>
                <p
                    onClick={() => setOpen(!open)} 
                    className='changing-title__text'
                >
                    ToDo
                </p>
                <div className="changing-title__icon">
                    <MoreHorizIcon/>
                </div>
            </div>
            )}
        </div>
     );
}


export default Title;