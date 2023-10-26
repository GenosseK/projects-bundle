import { useEffect, useState } from 'react';
import unsplashApi from '../../utils/UnsplashAPI';
import './Infinite-scroll.css';

function InfiniteScroll() {

    const [photos, setPhotos] = useState([])
    const initialCount = 1;

    useEffect(() => {
        unsplashApi.getPhotos(initialCount)
            .then(data => {
                setPhotos(data);
            })
            .catch(error => {
                console.error(error);
            })
    }, [])

    const openImage = (url) => {
        window.open(url, '_blank');
    };

    return (
        <main>
            <section className='infinite-scroll'>
                <header className='header'>
                    <h1 className='header__title'>UPLASH API - INFINITE SCROLL</h1>
                </header>
                <div className='images__container'>
                    {photos.map(photo => (
                        <img
                            className='images__image'
                            src={photo.urls.regular}
                            alt={photo.alt_description}
                            title={photo.alt_description}
                            key={photo.id}
                            onClick={() => openImage(photo.links.html)}
                        />
                    ))}
                </div>
            </section>
        </main>
    )
};

export default InfiniteScroll;

/*
import React, { useEffect, useState } from 'react';
import unsplashApi from '../../utils/UnsplashAPI';
import './Infinite-scroll.css';

function InfiniteScroll() {
    const [photos, setPhotos] = useState([]);
    const initialCount = 1;
    const [isLoading, setIsLoading] = useState(false);

    const loadMorePhotos = () => {
        if (!isLoading) {
            setIsLoading(true);
            unsplashApi.getPhotos(2) // Load 2 more photos
                .then(data => {
                    setPhotos([...photos, ...data]);
                    setIsLoading(false);
                })
                .catch(error => {
                    console.error(error);
                    setIsLoading(false);
                });
        }
    };

    useEffect(() => {
        unsplashApi.getPhotos(initialCount) // Load the initial photo
            .then(data => {
                setPhotos(data);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const openImage = (url) => {
        window.open(url, '_blank');
    };

    useEffect(() => {
        const handleScroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000
            ) {
                loadMorePhotos();
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [photos, isLoading]);

    return (
        <main>
            <section className='infinite-scroll'>
                <header className='header'>
                    <h1 className='header__title'>UNSPLASH API - INFINITE SCROLL</h1>
                </header>
                <div className='images__container'>
                    {photos.map(photo => (
                        <img
                            className='images__image'
                            src={photo.urls.regular}
                            alt={photo.alt_description}
                            title={photo.alt_description}
                            key={photo.id}
                            onClick={() => openImage(photo.links.html)}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

export default InfiniteScroll;
*/