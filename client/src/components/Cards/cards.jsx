import { useLoading } from '../../Redux/hooks/hooks'
import { useDispatch, useSelector } from 'react-redux';
import { getRecipes } from '../../Redux/action'
import { useState } from 'react';

import Card from "../Card/card";
import './cards.css';

export default function Cards(props) {
       // Obtiene el estado "allRecipes" del store de Redux mediante el hook useSelector
       const allRecipes = useSelector((state) => state.allRecipes);

       // Lógica para el paginado de las recetas
       const [currentPage, setCurrentPage] = useState(1);
       const itemsPerPage = 9;
       const indexOfLastItem = currentPage * itemsPerPage;
       const indexOfFirstItem = indexOfLastItem - itemsPerPage;
       const visibleItems = allRecipes.slice(indexOfFirstItem, indexOfLastItem);
       const totalPages = Math.ceil(allRecipes.length / itemsPerPage);
   
       const pageNumber = [];
   
       // Genera una lista de números de página para la paginación
       for (let i = 1; i <= totalPages; i++) {
           pageNumber.push(i);
       }
   
       // Hook para manejar la pantalla de carga
       const dispatch = useDispatch()
       const loading = useLoading(dispatch, getRecipes);
   
       // Función para pasar a la siguiente página
       const nextPage = () => {
           setCurrentPage(currentPage + 1);
       };
   
       // Función para pasar a la página anterior
       const prevPage = () => {
           setCurrentPage(currentPage - 1);
       };
   
       // Función para manejar el cambio de página
       const handlePageChange = (page) => {
           setCurrentPage(page);
       };
   
       // Devuelve la interfaz del componente Cards
       return (
           <div className='page'>
               <div className='invisible'></div>
               {/* Componente de paginación */}
               <div className='pagination'>
                   <input className='buttons'
                       type="button"
                       onClick={prevPage}
                       disabled={currentPage === 1}
                       value='Prev'
                   />
                   {pageNumber?.map((pagNum) => {
                       return (
                           <input type="button"
                               value={pagNum}
                               key={pagNum}
                               onClick={() => handlePageChange(pagNum)}
                               className='buttons'
                           />
                       );
                   })}
                   <input type="button"
                       disabled={currentPage >= totalPages}
                       onClick={nextPage}
                       value='Next'
                       className='buttons'
                   />
               </div>
               <p>
                   Page: {currentPage} of {totalPages}
               </p>
               {/* Renderiza el contenido de las recetas */}
               {loading ? (
                   // Muestra un spinner de carga si el estado "loading" es verdadero
                   <span className='loader'></span>
               ) : (
                   // Muestra la lista de recetas si el estado "loading" es falso
                   <div className="cont">
                       {visibleItems?.map((recipe) => {
                           return (
                               <Card
                                   img={recipe.image}
                                   name={recipe.title}
                                   id={recipe.id}
                                   key={recipe.id}
                                   healthScore={recipe.healthScore}
                                   summary={recipe.summary}
                                   steps={recipe.steps}
                                   diets={recipe.diets}
                               />
                           );
                       })}
                   </div>
               )}
           </div>
       );
   }
   