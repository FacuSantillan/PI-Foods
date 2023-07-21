import perfil from '../../images/about.jpg'
import logoface from '../../images/logoface.png'
import logoig from '../../images/logoig.png';
import logolink from '../../images/logolink.png'
import './about.css'

const About = () => {
    return(
        <div>
           <img src={perfil} className='perfil' alt="img"/>
        <div>

            <h1 className='title1'>About me:</h1>
            <ul className='text1'>Mi nombre es Facundo Santillán de la cohorte 39A soy de Concepción, Tucumán, Argentina. Tengo 20 años. Empecé en el mundo de la programación desde muy chico sin darme cuenta teniendo aproximadamente 8 años. Me adentré más a este mundo cuando tenía 17 años haciendo un curso de robótica e impresión 3D, me gusto, pero creía que necesitaba algo más, hice un curso de programación desde 0 y ahí es donde se me abrió la mente y decidí que es lo que quería para mi vida, ya habiendo finalizado mis estudios universitarios de los cuales solo necesito aprobar 4 materias para recibirme. Me recomendaron HENRY y sin dudar me adentré a donde estoy y lo cual es de lo que quiero vivir el día de mañana.</ul>
        </div>
        <div>
                <a title="Instagram" href="https://www.instagram.com/facuusantillanok/" target="_blank" rel="noreferrer"><img src={logoig} className='logo1' alt="Instagram" /></a>
                <a title="Facebook" href="https://www.facebook.com/facuu.santillan1" target="_blank" rel="noreferrer"><img src={logoface} className='logo2' alt="Facebook" /></a>
                <a title="Linkedin" href="https://www.linkedin.com/in/facundo-santillan-32072226a/" target="_blank" rel="noreferrer"><img src={logolink} className='logo3' alt="Linkedin" /></a>
            </div>
        </div>
    )
};

export default About;


