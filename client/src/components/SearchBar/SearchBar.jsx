import './SearchBar.css';
import busqueda from '../../images/busqueda.png'

import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { getRecipeName } from '../../Redux/action'

export default function SearchBar(props) {
    
    // Obtiene la función de despacho de acciones desde Redux
    const dispatch = useDispatch();
    // Define el estado "searchValue" y su función "setSearchValue" para el valor de búsqueda
    const [searchValue, setSearchValue] = useState('');

    // Función para manejar la búsqueda de recetas al hacer clic en el botón de búsqueda
    const handleSearch = () => {
        dispatch(getRecipeName(searchValue));
    };

    // Función para manejar la búsqueda de recetas al presionar la tecla "Enter" en la barra de búsqueda
    const handleKeyDown = (event) => {
        if (event.keyCode === 13) {
            dispatch(getRecipeName(searchValue));
        }
    };

    // Función para manejar la búsqueda de recetas al soltar la tecla "Enter" en la barra de búsqueda
    const handleEnter = (event) => {
        if (event.key === 'Enter') {
            dispatch(getRecipeName(searchValue))
        }
    };

    // Devuelve la interfaz del componente SearchBar
    return (
        <div>
            {/* Barra de búsqueda */}
            <input
                type='search'
                className='content'
                placeholder='Search recipe by name'
                value={searchValue}
                onChange={(event) => setSearchValue(event.target.value)}
                onKeyDown={handleKeyDown}
                onKeyUp={handleEnter}
            />
            {/* Botón de búsqueda */}
            <button onClick={handleSearch} className='submit'>
                <img src={busqueda} alt='img' className='search' />
            </button>
        </div>
    )
}
