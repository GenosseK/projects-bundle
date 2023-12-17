import './NASA-APOD.css';
import loaderRocket from '../../images/rocket.svg';
import { useState, useEffect } from 'react';

function NasaApod() {

    const [isLoading, setIsLoading] = useState(false);
    const [nasaApodSection, setNasaApodSection] = useState('main');
    const [apodData, setApodData] = useState([]);
    const [ready, setReady] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [favorites, setFavorites] = useState([]);

    const count = 3;
    const apiKey = 'JETYJShcEbqj1MH7lb4cc2Ce6URyfK5sFgZ0FZgB';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = () => {
        setIsLoading(true);
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setApodData((prevData) => [...prevData, ...data]);
                setTotalImages(data.length);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching NASA APOD images:', error);
                setIsLoading(false);
            })
    };

    const fetchMoreImages = () => {
        setIsLoading(true);
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setApodData((prevData) => [...prevData, ...data]);
                setTotalImages((prevCount) => prevCount + data.length);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching NASA APOD images:', error);
                setIsLoading(false);
            });
    };

    const imageLoaded = () => {
        setImagesLoaded(imagesLoaded + 1);
        if (imagesLoaded === totalImages) {
            setReady(true);
            setIsLoading(false)
        }
    };

    const handleScroll = () => {
        if ( nasaApodSection === 'main' && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            setReady(false);
            fetchMoreImages();
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ready, apodData]);

    const addToFavorites = (apod) => {
        setFavorites((prevFavorites) => [...prevFavorites, apod]);
    };

    const removeFromFavorites = (apod) => {
        setFavorites((prevFavorites) => prevFavorites.filter((fav) => fav.date !== apod.date));
    };

    // Function to toggle between main and favorites sections
    const toggleSection = (section) => {
        setNasaApodSection(section);
    };


    return (
        <main className='nasa-apod'>

            {isLoading && (
                <div className='nasa-apod__loader-container'>
                    <img src={loaderRocket} alt='Loading' />
                </div>
            )}


            <div className='nasa-apod__navigation-container'>

                {nasaApodSection === 'main' && (

                    <div className='nasa-apod__navigation__main-container'>
                        <button className='nasa-apod__navigation__button' onClick={() => toggleSection('favorites')} >Favorites</button>
                        <span className='nasa-apod__navigation__separator'>•</span>
                        <button className='nasa-apod__navigation__button'>Load more</button>
                    </div>

                )}

                {nasaApodSection === 'favorites' && (

                    <div className='nasa-apod__navigation__main-container'>
                        <button className='nasa-apod__navigation__button' onClick={() => toggleSection('main')}>Back to Main</button>
                    </div>

                )}

            </div>

            <div className='nasa-apod__cards-container'>

                {nasaApodSection === 'main' && apodData.map((apod) => (
                    <div onLoad={imageLoaded} key={apod.date} className='nasa-apod__card'>
                        <img src={apod.url} alt='' className='nasa-apod__card__image'></img>
                        <div className='nasa-apod__card__body'>
                            <h5 className='nato-apod__card__title'>{apod.title}</h5>
                            <p className='nasa-apod__card__favorites-button' onClick={() => addToFavorites(apod)} >Add To Favorites</p>
                            <p className='nasa-apod__card__text'>{apod.explanation}</p>
                            <small className='nasa-apod__card__sub-text'>
                                <strong>{apod.date}</strong>
                                <span> Copyright Info</span>
                            </small>
                        </div>
                    </div>
                ))}

                {nasaApodSection === 'favorites' &&
                    favorites.map((apod) => (
                        <div key={apod.date} className='nasa-apod__card'>
                            <img src={apod.url} alt='' className='nasa-apod__card__image'></img>
                            <div className='nasa-apod__card__body'>
                                <h5 className='nato-apod__card__title'>{apod.title}</h5>
                                <p
                                    className='nasa-apod__card__favorites-button'
                                    onClick={() => removeFromFavorites(apod)}
                                >
                                    Remove from Favorites
                                </p>
                                <p className='nasa-apod__card__text'>{apod.explanation}</p>
                                <small className='nasa-apod__card__sub-text'>
                                    <strong>{apod.date}</strong>
                                    <span> Copyright Info</span>
                                </small>
                            </div>
                        </div>
                    ))}

            </div>

            <div className='nasa-apod__save-confirmed'>
                <h1>Added!</h1>
            </div>


        </main>
    )
}

export default NasaApod;