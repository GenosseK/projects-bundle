import { useEffect, useState, useRef } from 'react';
import unsplashApi from '../../utils/UnsplashAPI';
import './Infinite-scroll.css';
import loader from '../../images/loader-for-scroll.svg';

function InfiniteScroll() {
    const [photos, setPhotos] = useState([]);
    const initialCount = 5;
    const loadMoreCount = 10;
    const [ready, setReady] = useState(false);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const [totalImages, setTotalImages] = useState(0);
    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true)
        unsplashApi.getPhotos(initialCount)
            .then(data => {
                setPhotos(data);
                setTotalImages(data.length);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(()=>{
                setIsLoading(false)
            })
    }, []);

    const openImage = (url) => {
        window.open(url, '_blank');
    };

    const imageLoaded = () => {
        setImagesLoaded(imagesLoaded + 1);
        if (imagesLoaded === totalImages) {
            setReady(true);
            setIsLoading(false)
        }
    };

    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
            setReady(false);
            getMorePhotos();
        }
    };

    const getMorePhotos = () => {
        setIsLoading(true)
        unsplashApi.getPhotos(loadMoreCount)
            .then(data => {
                setPhotos([...photos, ...data]);
                setTotalImages(photos.length + loadMoreCount);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(()=>{
                setIsLoading(false)
            })
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [ready, photos]);

    return (
        <main>
            <section className='infinite-scroll'>
                <header className='header'>
                    <h1 className='header__title'>UPLASH API - INFINITE SCROLL</h1>
                </header>
                <div className='images__container'>
                    {isLoading && (<div className='scroll-loader'>
                        <div className='scroll-loader__container'>
                            <img className='scroll-loader__animation' src={loader} alt='Loading' />
                        </div>
                    </div>)}
                    {photos.map(photo => (
                        <img
                            className='images__image'
                            src={photo.urls.regular}
                            alt={photo.alt_description}
                            title={photo.alt_description}
                            key={photo.id}
                            onClick={() => openImage(photo.links.html)}
                            onLoad={imageLoaded}
                        />
                    ))}
                </div>
            </section>
        </main>
    );
}

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