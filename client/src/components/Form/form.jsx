import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { validateForm } from '../../validates';
import { useDispatch, useSelector } from 'react-redux';
import { addRecipe } from '../../Redux/action';

import imagen from '../../images/form.png'
import './form.css';

export default function Form(props) {
    
    // Utiliza el hook useSelector para obtener el estado "allDiets" del store de Redux
    const allDiets = useSelector((state) => state.allDiets);

    // Utiliza el hook useNavigate para obtener una función de navegación para React Router
    const navigate = useNavigate();

    // Utiliza el hook useDispatch para obtener una función que permite despachar acciones en Redux
    const dispatch = useDispatch();

   // Utiliza el hook useState para definir un estado local "form" con sus valores iniciales
    const [form, setForm] = useState({
    title: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: [],
    diets: [],
    numSteps: 0,
});

    // Utiliza el hook useState para definir un estado local "errors" con sus valores iniciales
    const [errors, setErrors] = useState({
    title: '',
    image: '',
    summary: '',
    healthScore: '',
    steps: '',
    diets: '',
});

// Utiliza el hook useState para definir un estado local "stepDescription" con valor inicial vacío
    const [stepDescription, setStepDescription] = useState('');

   // Maneja el cambio de los campos de entrada en el formulario
    const handleChange = (event) => {
    const property = event.target.name;
    const value = event.target.value;

    // Actualiza el estado local "form" con el nuevo valor del campo
    setForm({ ...form, [property]: value });

    // Valida el formulario en función del nuevo valor y actualiza los errores en el estado local "errors"
    validateForm({ ...form, [property]: value }, setErrors, errors);
};

    // Limpia el formulario estableciendo los campos en sus valores iniciales
    const clearForm = (event) => {
    event.preventDefault();
    setForm({
        title: '',
        image: '',
        summary: '',
        healthScore: '',
        steps: [],
        diets: [],
        numSteps: 0,
    });
};

    // Maneja la presentación del formulario
    const handleSubmit = (event) => {
    event.preventDefault();
    // Despacha la acción "addRecipe" con los datos del formulario y redirige a "/home" después de que la acción se complete
    dispatch(addRecipe(form)).then(() => {
        navigate('/home');
    });

    // Muestra una alerta de éxito al usuario después de que la receta se ha creado correctamente
    alert('Tu receta ha sido creada exitosamente');

    // Limpia el formulario estableciendo los campos en sus valores iniciales
    setForm({
        title: '',
        image: '',
        summary: '',
        healthScore: '',
        steps: [],
        diets: [],
        numSteps: 0,
    });
};

    // Maneja el cambio en el campo de descripción de los pasos en el formulario
    const handleChangeSteps = (event) => {
    setStepDescription(event.target.value);
};

        // Maneja la adición de un nuevo paso al formulario
    const handleStep = (event) => {
    event.preventDefault();
    if (stepDescription !== '') {
        // Agrega un nuevo paso al estado local "form.steps" con un número y descripción y actualiza el contador de pasos
        setForm({
            ...form,
            steps: [
                ...form.steps,
                { number: form.numSteps + 1, step: stepDescription },
            ],
            numSteps: form.numSteps + 1,
        });
        // Limpia el campo de descripción de los pasos
        setStepDescription('');
    } else {
        // Muestra una alerta si el campo de descripción de los pasos está vacío
        alert('Por favor, ingresa un paso');
    }
};

    // Maneja la eliminación de todos los pasos del formulario
    const handleDelete = (event) => {
    event.preventDefault();
    // Vacía la lista de pasos en el estado local "form.steps"
    setForm({
        ...form,
        steps: [],
    });
};

   // Maneja el cambio en el campo de selección de tipo de dieta en el formulario
    const changeHandler = (event) => {
    const value = event.target.value;
    // Agrega el valor seleccionado al estado local "form.diets"
    setForm({ ...form, diets: [...form.diets, value] });
};  

    // Devuelve la interfaz del formulario
return (
    <div>
        {/* Muestra una imagen */}
        <img src={imagen} className='imagen' alt='img' />
        <div className='frm'>
            {/* Inicia el formulario */}
            <form onSubmit={handleSubmit}>
                {/* Campo de entrada para el nombre de la receta */}
                <div className='inpt'>
                    <label htmlFor="title">Nombre de la Receta</label>
                    <input className='inpt' type="text"
                        id='title'
                        name='title'
                        value={form.title}
                        onChange={handleChange}
                    />
                    <span>{errors.title}</span>
                </div>

                {/* Campo de entrada para el enlace de la imagen */}
                <div className='inpt'>
                    <label htmlFor="image">Enlace de la Imagen</label>
                    <input className='inpt' type="text"
                        name="image"
                        id="image"
                        onChange={handleChange}
                        value={form.image}
                    />
                    <span>{errors.image}</span>
                </div>

                {/* Campo de entrada para el resumen de la receta */}
                <div className='inpt'>
                    <label htmlFor='summary'>Resumen de la Receta:</label>
                    <textarea className='inpt'
                        name='summary'
                        id='summary'
                        cols='40'
                        rows='5'
                        value={form.summary}
                        onChange={handleChange}
                    ></textarea>
                    <span>{errors.summary}</span>
                </div>

                {/* Campo de entrada para la puntuación de salud de la receta */}
                <div className='inpt'>
                    <label htmlFor='healthScore'>Puntuación de Salud:</label>
                    <input className='inpt'
                        type='number'
                        id='healthScore'
                        name='healthScore'
                        value={form.healthScore}
                        onChange={handleChange}
                    />
                    <span>{errors.healthScore}</span>
                </div>

                {/* Campo de entrada para los pasos de la receta */}
                <div className='inpt'>
                    <label htmlFor='steps'>Paso a Paso</label>
                    <textarea
                        name='steps'
                        id='steps'
                        cols='40'
                        rows='5'
                        value={stepDescription}
                        onChange={handleChangeSteps}
                    ></textarea>
                    <div>
                        {/* Botón para agregar un paso */}
                        <button
                            onClick={handleStep}
                            className='btnx'
                        >
                            Agregar
                        </button>
                        {/* Botón para eliminar todos los pasos */}
                        <button
                            onClick={handleDelete}
                            className='btnx'
                        >
                            Limpiar
                        </button>
                    </div>
                    {/* Lista de los pasos agregados */}
                    <ul>
                        {form.steps?.map((step, index) => {
                            return (
                                <p key={index}>
                                    <strong>Paso {step.number}:</strong>{' '}
                                    {step.step}
                                </p>
                            );
                        })}
                    </ul>
                </div>

                {/* Campo de selección para el tipo de dieta */}
                <div className='inpt'>
                    <label htmlFor='diets'>Tipo de Dieta:</label>
                    <select className='inpt'
                        name='diets'
                        id='diets'
                        onChange={changeHandler}
                    >
                        {/* Mapea las opciones de dieta desde el estado "allDiets" */}
                        {allDiets?.map((diet) => {
                            return (
                                <option value={diet.name} key={diet.name}>
                                    {diet.name}
                                </option>
                            );
                        })}
                    </select>
                </div>

                {/* Botones para enviar el formulario y limpiarlo */}
                <div className='inpt'>
                    {/* El botón de envío está desactivado si hay campos vacíos o errores */}
                    <button
                        disabled={
                            form.title &&
                                form.image &&
                                form.summary &&
                                form.healthScore &&
                                form.steps &&
                                form.diets &&
                                !(
                                    errors.title &&
                                    errors.image &&
                                    errors.summary &&
                                    errors.healthScore &&
                                    errors.steps &&
                                    errors.diets
                                )
                                ? false
                                : true
                        }
                        type='submit'
                    >
                        Crear
                    </button>
                    <button onClick={clearForm}>Limpiar Formulario</button>
                </div>
            </form>
        </div>
        <div></div>
        <div></div>
    </div>
)
                    }






