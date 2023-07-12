import './SearchBar.css';
import { useState } from 'react';

const SearchBar = ({onSearch}) => {
    const [id, setId] = useState('');
    const [title, setTitle] = useState('');

    const handleChange = (event) => {
        setId(event.target.value);
        setName(event.target.value);
    };

    return (
        <div className={style.contenedor}>
         <input placeholder='ingrese numero entre el 0 y el 826' className='container' type='search' onChange={handleChange} value={id}/> 
         <button className={style.button} onClick={()=> {onSearch(id)}}>Search</button> 
      </div>
    )
}