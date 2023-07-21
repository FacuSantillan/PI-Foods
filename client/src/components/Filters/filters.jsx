import { useDispatch } from 'react-redux';
import { filterByDiet, filterByOrigin, orderByHealthScore, orderByName } from '../../Redux/action';

import './filtro.css'

export default function Filters() {

  // Obtiene la función de despacho de acciones desde Redux
  const dispatch = useDispatch();

  // Obtiene el estado "allDiets" del store de Redux mediante el hook useSelector (no se muestra la importación del hook)
  const diets = useSelector((state) => state.allDiets);

  // Maneja el filtro por dieta al seleccionar una opción del menú desplegable
  const handleFilter = (event) => {
    dispatch(filterByDiet(event.target.value));
  };

  // Maneja el ordenamiento por nombre al seleccionar una opción del menú desplegable
  const handleOrder = (event) => {
    dispatch(orderByName(event.target.value));
  };

  // Maneja el ordenamiento por puntuación de salud al seleccionar una opción del menú desplegable
  const handleOrderHealthScore = (event) => {
    dispatch(orderByHealthScore(event.target.value));
  };

  // Maneja el filtro por origen al seleccionar una opción del menú desplegable
  const handleFilterOrigin = (event) => {
    dispatch(filterByOrigin(event.target.value));
  };

  return (
    <div className='filter'>
      <div>
        {/* Filtro por dietas */}
        <label htmlFor="filterSelect">Filtrar por Dietas</label>
        <select
          name="filter"
          id="filterSelect"
          onChange={handleFilter}
          defaultValue='--Select--'
        >
          <option disabled>--Select--</option>
          <option value='NF'>Ninguno</option>
          {diets?.map((diet, index) => {
            return (
              <option key={index} value={diet.name}>
                {diet.name}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        {/* Filtro por origen */}
        <label htmlFor="origin">Filtrar por Origen</label>
        <select
          name="origin"
          id="origin"
          defaultValue='--Select--'
          onChange={handleFilterOrigin}
        >
          <option disabled>--Select--</option>
          <option value="NF">Sin filtro</option>
          <option value="API">API</option>
          <option value="DB">Base de datos</option>
        </select>
      </div>

      <div>
        {/* Ordenar por nombre */}
        <label htmlFor='orderSelect'>Ordenar por Nombre</label>
        <select
          onChange={handleOrder}
          name='orderSelect'
          id='orderSelect'
          defaultValue='--Select--'
        >
          <option disabled>--Select--</option>
          <option value='A'>A - Z</option>
          <option value='D'>Z - A</option>
        </select>
      </div>

      <div>
        {/* Ordenar por puntuación de salud */}
        <label htmlFor='orderHealthScore'>Ordenar por Puntuación de Salud</label>
        <select
          onChange={handleOrderHealthScore}
          name='orderHealthScore'
          id='orderHealthScore'
          defaultValue='--Select--'
        >
          <option disabled>--Select--</option>
          <option value='A'>0 - 100</option>
          <option value='D'>100 - 0</option>
        </select>
      </div>
    </div>
  );
}