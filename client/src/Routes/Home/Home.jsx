
import fondo1 from '../../images/fondo1.jpg';
import fondo2 from '../../images/fondo2.jpg';
import fondo3 from '../../images/sushi.jpg';
import cheese from '../../images/cheese.jpg'
import pub from '../../images/pub.jpg'
import "./Home.css";


export default function Home() {

    return(
        <div>
            <img className='imagen1' src={fondo1} alt="img" />
            <img className='imagen2' src={fondo2} alt="img" /> 
            <img className='imagen3' src={fondo3} alt="img" /> 
            <div>
                <h1 className='history'>Luxury Bar</h1>
                <ul className='history2'>No es solo un restaurante, es donde se viven momentos, risas, historias, encuentros, etc. donde no solo te ofrecemos opciones para tu almuerzo o cena, también te ofrecemos nuestro servicio, nuestras experiencias y nuestra sonrisa. Es un espacio donde no eres solo nuestro cliente, también formas, partes de nuestra familia y nos gusta hacerte sentir como tal.</ul>
            </div>
            <img className='imagen4' src={cheese} alt="img" /> 
            <img className='imagen5' src={pub} alt="img" /> 
            <div>
                <ul className='history3'>Nuestras manos capacitadas para satisfacer hasta los mas exigentes paladares.</ul>
            </div>
    
        </div>
    )
    }
