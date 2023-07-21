import style from './detail.css'

import { useLoading } from '../../Redux/hooks/hooks'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { getRecipeId } from '../../Redux/action';

export default function Detail(props) {

  const { id }  = useParams();

  const recipes = useSelector((state) => state.recipeid)

  const loading = useLoading(getRecipeId, id);


    return(
        <div className='contain'>
          {loading ? (
                <span className='loader'></span>
            ) : (
          <div className='asd'>
            <div>
          <h1 className='name'>{recipes.title}</h1>
            <img className='image' src={recipes.image} alt="img" />
          </div>
          <div className='recipeData'>
          <h2>HealthScore:</h2> 
          <h3>{recipes.healthScore}</h3>
            <h2>Summary:</h2>
            <p dangerouslySetInnerHTML={{
                            __html: recipes.summary,
                        }}
                        ></p>
            <h2>Diets:</h2>
              <p>{recipes.diets?.map((diet) => {
                        return (
                            <div>
                                <span>•{diet.name}</span>
                            </div>
                        );
                    })}</p>
                      <h2>Step by step:</h2>
            {recipes.steps?.map((step, index) => {
						return (
							<div key={index}>
								<h3>Step {step.number}</h3>
								<ul>
									<p>{step.step}</p>
								</ul>
							</div>
            		);
					})}
          </div>
        </div>
          )}
        </div>
    )
    
};
