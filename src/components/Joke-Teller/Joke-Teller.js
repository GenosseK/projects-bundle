import { useEffect, useState } from 'react';
import { convertText } from '../../utils/VoiceRSSAPI';
import './Joke-Teller.css';

function JokeTeller() {
    const [joke, setJoke] = useState('');
    const [jokeFetched, setJokeFetched] = useState(false);

    const [audioEnded, setAudioEnded] = useState(true);

    const convertJoke = () => {
        convertText(joke)
            .then((audioBlob) => {
                const audio = new Audio(URL.createObjectURL(audioBlob));
                audio.play();
                audio.onended = () => {
                    setAudioEnded(true);
                };
                setAudioEnded(false);
            })
            .catch((error) => console.log('Failed to convert a joke: ', error));
    }

    const getJoke = () => {
        setJokeFetched(false);

        return fetch('https://v2.jokeapi.dev/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist,explicit')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    return Promise.reject(`Error: ${response.status}`);
                }
            })
            .then((data) =>{ 
                if (data.setup) {
                    setJoke(`${data.setup} ... ${data.delivery}`)
                } else {
                    setJoke(data.joke)
                }
            })
            .catch((error) => {
                console.error('Failed to fetch joke: ', error);
            })
            .finally(() => {
                setJokeFetched(true);
            })
    }

    useEffect(() => {
        if (jokeFetched) {
            convertJoke();
        }
    }, [jokeFetched]);

    return (
        <section className='joke-teller'>
            <div className='joke-teller__container'>
                <button className={`joke-teller__button ${!audioEnded ? 'active' : ''}`} onClick={getJoke} disabled={!audioEnded}>
                {audioEnded ? 'Tell me a Joke' : 'Playing...'}
                </button>
                <audio className='joke-teller__audio'></audio>
            </div>
        </section>
    )
};

export default JokeTeller;
