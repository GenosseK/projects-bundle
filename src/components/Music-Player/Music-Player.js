import './Music-Player.css';
import image1 from '../../images/jacinto-1.jpg';
import image2 from '../../images/jacinto-2.jpg';
import image3 from '../../images/jacinto-3.jpg';
import image4 from '../../images/metric-1.jpg';
import audio1 from '../../music/jacinto-1.mp3';
import audio2 from '../../music/jacinto-2.mp3';
import audio3 from '../../music/jacinto-3.mp3';
import audio4 from '../../music/metric-1.mp3';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faForward, faPause, faPlay } from '@fortawesome/free-solid-svg-icons';
import { createRef, useEffect, useRef, useState } from 'react';

function MusicPlayer() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const audioElement = useRef();
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    const songs = [
        { title: 'Electric Chill Machine', artist: 'Jacinto', src: audio1, cover: image1 },
        { title: 'Seven Nation Army (Remix)', artist: 'Jacinto', src: audio2, cover: image2 },
        { title: 'Goodnight, Disco Queen', artist: 'Jacinto', src: audio3, cover: image3 },
        { title: 'Front Row (Remix)', artist: 'Metric/Jacinto', src: audio4, cover: image4 }
    ];

    useEffect(() => {
        audioElement.current.src = songs[currentSongIndex].src;
        if (isPlaying) {
            audioElement.current.play().catch(error => console.log(error));
        }
    }, [currentSongIndex]);

    useEffect(() => {
        const audio = audioElement.current;
    
        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        };
    
        const updateDuration = () => {
            setDuration(audio.duration);
        };
    
        audio.addEventListener('timeupdate', updateTime);
        audio.addEventListener('loadedmetadata', updateDuration);
    
        return () => {
            audio.removeEventListener('timeupdate', updateTime);
            audio.removeEventListener('loadedmetadata', updateDuration);
        };
    }, []);
    
    const togglePlay = () => {
        if (isPlaying) {
            audioElement.current.pause();
        } else {
            audioElement.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const playNext = () => {
        const nextIndex = (currentSongIndex + 1) % songs.length;
        setCurrentSongIndex(nextIndex);
    };

    const playPrevious = () => {
        let prevIndex = currentSongIndex - 1;
        if (prevIndex < 0) {
            prevIndex = songs.length - 1;
        }
        setCurrentSongIndex(prevIndex);
    };

    const setProgressBar = e => {
        const width = e.target.clientWidth;
        const clickX = e.nativeEvent.offsetX;
        const duration = audioElement.current.duration;
        audioElement.current.currentTime = (clickX / width) * duration;
    };

    function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;
        return `${minutes}:${formattedSeconds}`;
    }

    return (
        <main>
            <section className='music-player'>
                <div className='music-player__container'>
                    <div className='image__container'>
                        <img className='album-image' src={songs[currentSongIndex].cover} alt='Album Cover' />
                    </div>
                    <h2 className='song__title'>{songs[currentSongIndex].title}</h2>
                    <h3 className='song__artist'>{songs[currentSongIndex].artist}</h3>
                    <audio ref={audioElement} onEnded={playNext}></audio>
                    <div className='progress-bar__container' onClick={setProgressBar}>
                        <div className='progress-bar' style={{ width: `${(currentTime / duration) * 100}%` }}></div>
                        <div className='duration-wrapper'>
                            <span className='current-time'>{formatTime(currentTime)}</span>
                            <span className='duration'>{formatTime(duration)}</span>
                        </div>
                    </div>
                    <div className='player-controls__container'>
                        <FontAwesomeIcon icon={faBackward} className='player-controls__button player-controls__previous' title='Previous' onClick={playPrevious}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className='player-controls__button player-controls__play' title={isPlaying ? 'Pause' : 'Play'} onClick={togglePlay}></FontAwesomeIcon>
                        <FontAwesomeIcon icon={faForward} className='player-controls__button player-controls__next' title='Next' onClick={playNext}></FontAwesomeIcon>
                    </div>
                </div>
            </section>
        </main>
    )
};

export default MusicPlayer;