import React, { useContext, useState } from 'react';
import './Title.scss'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import Contexts from '../../utils/Contexts';

function Title({ title, listId }) {
    const [open, setOpen] = useState(false);
    const [listTitle, setListTitle] = useState(title);
    const {updateListTitle} = useContext(Contexts)

    const handleOnChange = (e) => {
        setListTitle(e.target.value);
    }

    const handleOnBlur = () => {
        updateListTitle(listTitle, listId);
        setOpen(false);
    }

    return ( 
        <div>
            {open? (
            <div className='title'>
                <input 
                    value={listTitle} 
                    className='title__input'
                    autoFocus
                    onChange={handleOnChange}
                    onBlur = {handleOnBlur}
                />
            </div>
            ) : (
            <div className='changing-title'>
                <h1
                    className='changing-title__text'
                >
                    {listTitle}
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