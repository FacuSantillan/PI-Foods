import { Link } from 'react-router-dom';

import './card.css'

export default function Card (props){
// Destructura las propiedades "id", "img" y "name" del objeto "props"
const { id, img, name } = props;

  return (
    <div className="card">
      {/* Enlace a la página de detalles de la receta */}
      <Link className='link' to={`/detail/${id}`}>
        {/* Imagen de la receta */}
        <img src={img} alt="Food" className="card-img" />
        {/* Contenido de la tarjeta */}
        <div className="card-content">
          {/* Título de la receta */}
          <h3 className="card-title">{name}</h3>
        </div>
      </Link>
    </div>
  );
}