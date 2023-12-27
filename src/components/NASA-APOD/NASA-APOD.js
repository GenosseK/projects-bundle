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
    const [saveConfirmed, setSaveConfirmed] = useState(false);


    const count = 3;
    const apiKey = 'JETYJShcEbqj1MH7lb4cc2Ce6URyfK5sFgZ0FZgB';
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

    const saveFavoritesToLocalStorage = (favorites) => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    };

    const getFavoritesFromLocalStorage = () => {
        const storedFavorites = localStorage.getItem('favorites');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    };

    useEffect(() => {
        fetchImages();
        setFavorites(getFavoritesFromLocalStorage());
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

    const fetchNewImages = () => {
        setIsLoading(true);
        setApodData([]); // Reset apodData to clear the existing images
        fetch(apiUrl)
            .then((response) => response.json())
            .then((data) => {
                setApodData(data);
                setTotalImages(data.length);
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
        if (nasaApodSection === 'main' && window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
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
        const isAlreadyInFavorites = favorites.some((fav) => fav.date === apod.date);

        if (isAlreadyInFavorites) {
            removeFromFavorites(apod);
            setSaveConfirmed('Removed!');
        } else {
            setFavorites((prevFavorites) => [...prevFavorites, apod]);
            setSaveConfirmed('Added!');
        }

        saveFavoritesToLocalStorage(favorites);

        setTimeout(() => {
            setSaveConfirmed(false);
        }, 3000);
    };

    const removeFromFavorites = (apod) => {
        const updatedFavorites = favorites.filter((fav) => fav.date !== apod.date);
        setFavorites(updatedFavorites);

        saveFavoritesToLocalStorage(updatedFavorites);
    };

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
                        <button className='nasa-apod__navigation__button' onClick={fetchNewImages}>Load more</button>
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
                        <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                            <img src={apod.url} alt='' className='nasa-apod__card__image'></img>
                        </a>
                        <div className='nasa-apod__card__body'>
                            <h5 className='nato-apod__card__title'>{apod.title}</h5>
                            <p className='nasa-apod__card__favorites-button' onClick={() => addToFavorites(apod)}>
                                {favorites.some((fav) => fav.date === apod.date) ? 'Remove from Favorites' : 'Add To Favorites'}
                            </p>
                            <p className='nasa-apod__card__text'>{apod.explanation}</p>
                            <small className='nasa-apod__card__sub-text'>
                                <strong>{apod.date}</strong>
                                <span> {apod.copyright || ''}</span>
                            </small>
                        </div>
                    </div>
                ))}

                {nasaApodSection === 'favorites' &&
                    favorites.map((apod) => (
                        <div key={apod.date} className='nasa-apod__card'>
                            <a href={apod.hdurl} target="_blank" rel="noopener noreferrer">
                                <img src={apod.url} alt='' className='nasa-apod__card__image'></img>
                            </a>
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
                                    <span> {apod.copyright || ''}</span>
                                </small>
                            </div>
                        </div>
                    ))}

            </div>

            {saveConfirmed && (
                <div className='nasa-apod__save-confirmed'>
                    <h1>{saveConfirmed}</h1>
                </div>
            )}


        </main>
    )
}

export default NasaApod;