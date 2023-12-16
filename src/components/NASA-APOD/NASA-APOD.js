import './NASA-APOD.css';
import loaderRocket from '../../images/rocket.svg';
import { useState } from 'react';

function NasaApod() {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <main className='nasa-apod'>

            {isLoading && (
                <div className='nasa-apod__loader-container'>
                    <img src={loaderRocket} alt='Loading' />
                </div>
            )}

       
                <div className='nasa-apod__navigation-container'>

                    <div className='nasa-apod__navigation__main-container'>
                        <button className='nasa-apod__navigation__button'>Favorites</button>
                        <span className='nasa-apod__navigation__separator'>•</span>
                        <button className='nasa-apod__navigation__button'>Load more</button>
                    </div>

                </div>

                <div className='nasa-apod__container'>
                    
                </div>
           

        </main>
    )
}

export default NasaApod;