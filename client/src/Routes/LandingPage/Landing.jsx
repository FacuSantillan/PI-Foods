import { NavLink } from "react-router-dom"
import style from './Landing.css'

const Landing = () => {
    return(
        <div>
            <h1 className='title'>¿Listo para esta aventura gastronómica?</h1>
            
                <NavLink to="/home">
                    <button className="textButton">¡Vamos!</button>
                </NavLink>
           
        </div>
    )
}
export default Landing