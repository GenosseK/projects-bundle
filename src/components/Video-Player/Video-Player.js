import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Video-Player.css';
import LoadingAnimation from '../../images/Loading.svg'
import { faExpand, faPlay, faVolumeUp, faPause, faVolumeMute } from '@fortawesome/free-solid-svg-icons';

function VideoPlayer() {

    const [isPlaying, setIsPlaying] = useState(false);
    const [volume, setVolume] = useState(0.5);
    const [speed, setSpeed] = useState(1);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const video = useRef()
    const progressBar = useRef();
    const currentTime = useRef();
    const duration = useRef();
    const player = useRef();


    useEffect(() => {
        const handleLoadedData = () => {
            setIsLoading(false);
        };

        video.current.addEventListener('loadeddata', handleLoadedData);

        return () => {
            video.current.removeEventListener('loadeddata', handleLoadedData);
        };
    }, []);

    const togglePlay = () => {
        if (video.current.paused) {
            // Check if the video is ready to play
            if (video.current.readyState >= 2) {
                video.current.play();
                setIsPlaying(true);
            } else {
                // If not ready, wait for the 'canplay' event
                video.current.addEventListener('canplay', () => {
                    video.current.play();
                    setIsPlaying(true);
                }, { once: true });
            }
        } else {
            video.current.pause();
            setIsPlaying(false);
        }
    };

    useEffect(() => {
        const handleVideoClick = () => {
            togglePlay();
        };

        video.current.addEventListener('click', handleVideoClick);

        return () => {
            video.current.removeEventListener('click', handleVideoClick);
        };
    }, []);

    function displayTime(time) {
        const minutes = Math.floor(time / 60);
        let seconds = Math.floor(time % 60);
        seconds = seconds > 9 ? seconds : `0${seconds}`;
        return `${minutes}:${seconds}`;
    }

    const setProgressBar = (e) => {
        const progressBar = e.currentTarget;
        const clickX = e.clientX - progressBar.getBoundingClientRect().left;
        const width = progressBar.clientWidth;
        const duration = video.current.duration;

        video.current.currentTime = (clickX / width) * duration;
    };

    const [restoreVolume, setRestoreVolume] = useState(5);

    const setVolumeLevel = () => {
        // Check if the volume is already muted
        if (volume === 0) {
            // If muted, restore the previous volume level
            setVolume(restoreVolume);
            video.current.volume = restoreVolume;
        } else {
            // If not muted, save the current volume level and mute
            setRestoreVolume(volume);
            setVolume(0);
            video.current.volume = 0;
        }
    };

    const setVolumeSlider = (e) => {
        const volumeSliderContainer = e.currentTarget;
        const clickX = e.clientX - volumeSliderContainer.getBoundingClientRect().left;
        const width = volumeSliderContainer.clientWidth;
        const newVolume = clickX / width;

        let roundedVolume;
        if (newVolume < 0.1) {
            roundedVolume = 0;
        } else if (newVolume > 0.9) {
            roundedVolume = 1;
        } else {
            roundedVolume = newVolume;
        }

        setVolume(roundedVolume);
        video.current.volume = roundedVolume;
    };

    const increaseVolume = () => {
        const newVolume = Math.min(volume + 0.1, 1);
        setVolume(newVolume);
        video.current.volume = newVolume;
    };

    const decreaseVolume = () => {
        const newVolume = Math.max(volume - 0.1, 0);
        setVolume(newVolume);
        video.current.volume = newVolume;
    };

    const jumpBackward = () => {
        const newTime = Math.max(video.current.currentTime - 5, 0);
        video.current.currentTime = newTime;
    };

    const jumpForward = () => {
        const newTime = Math.min(video.current.currentTime + 5, video.current.duration);
        video.current.currentTime = newTime;
    };

    const openFullScreen = () => {
        const element = player.current;

        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            /* Firefox */
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            /* Chrome, Safari and Opera */
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            /* IE/Edge */
            element.msRequestFullscreen();
        }
        setIsFullscreen(true);
    };

    const closeFullscreen = () => {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari and Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }
        setIsFullscreen(false);
    }

    const toggleFullscreen = () => {
        if (!isFullscreen) {
            openFullScreen();
        } else {
            closeFullscreen();
        }
    };

    const changePlaybackSpeed = (e) => {
        const newSpeed = parseFloat(e.target.value);
        setSpeed(newSpeed);
        video.current.playbackRate = newSpeed;
    };

    useEffect(() => {
        const updateProgress = () => {
            progressBar.current.style.width = `${(video.current.currentTime / video.current.duration) * 100}%`;
            currentTime.current.textContent = `${displayTime(video.current.currentTime)} /`;
            duration.current.textContent = `${displayTime(video.current.duration)}`;
        };

        const handleVideoEnd = () => {
            setIsPlaying(false);
        };

        video.current.addEventListener('timeupdate', updateProgress);
        video.current.addEventListener('ended', handleVideoEnd);

        return () => {
            video.current.removeEventListener('timeupdate', updateProgress);
            video.current.removeEventListener('ended', handleVideoEnd);
        };
    }, []);

    useEffect(() => {
        const handleKeyPress = (e) => {
            switch (e.code) {
                case 'Space':
                    togglePlay();
                    break;
                case 'ArrowUp':
                    increaseVolume();
                    break;
                case 'ArrowDown':
                    decreaseVolume();
                    break;
                case 'ArrowLeft':
                    jumpBackward();
                    break;
                case 'ArrowRight':
                    jumpForward();
                    break;
                case 'KeyM':
                    setVolumeLevel();
                    break;
                case 'KeyF':
                    toggleFullscreen();
                    break;
                default:
                    break;
            }
        };

        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [togglePlay]);


    return (
        <main className='videoPlayer_main'>
            <div className='videoPlayer' ref={player}>
            {isLoading && (
                    <div className="loading__container">
                    <img
                      src={LoadingAnimation}
                      alt="Загрузка страницы"
                      className="loading__animation"
                    />
                  </div>
                )}
                <video
                    ref={video}
                    className={`videoPlayer__video ${isFullscreen ? 'video-fullscreen' : ''}`}
                    src='https://pixabay.com/videos/download/video-41758_source.mp4?attachment'
                    playsInline
                ></video>
                <div className='videoPlayer__container'>

                    <div className='videoPlayer__video-controls__container'>

                        <div className='video-controls__progress-bar__contaier' onClick={setProgressBar}>
                            <div ref={progressBar} className='progress-bar__video-bar'></div>
                        </div>

                        <div className='video-controls__playback-controls'>

                            <div className='playback-controls__controls-left'>
                                <div className='controls-left__play-button__container' onClick={togglePlay}>
                                    <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} className='controls-left__play-button videoPlayer__icons'></FontAwesomeIcon>
                                </div>
                                <div className='controls-left__volume__container'>
                                    <div className='controls-left__volume-button_container'>
                                        <FontAwesomeIcon icon={volume === 0 ? faVolumeMute : faVolumeUp} onClick={setVolumeLevel} className='controls-left__volume-button videoPlayer__icons' />
                                    </div>
                                    <div onClick={setVolumeSlider} className='controls-left__volume-bar__container'>
                                        <div className='controls-left__volume-bar' style={{ width: `${volume * 100}%` }}></div>
                                    </div>
                                </div>
                            </div>

                            <div className='playback-controls__controls-right'>

                                <div className='controls-right__player-speed__container'>
                                    <select className='player-speed__selector' value={speed} onChange={changePlaybackSpeed}>
                                        <option value="0.5" className='selector__option'>0.5 x</option>
                                        <option value="0.75" className='selector__option'>0.75 x</option>
                                        <option value="1" defaultValue className='selector__option'>1.0 x</option>
                                        <option value="1.5" className='selector__option'>1.5 x</option>
                                        <option value="2" className='selector__option'>2.0 x</option>
                                    </select>
                                </div>

                                <div className='controls-right__video-time__container'>
                                    <span ref={currentTime} className='video-time_elapsed'>00:00 / </span>
                                    <span ref={duration} className='video-time_duration'>00:00</span>
                                </div>

                                <div className='controls__fullscreen-button__container'>
                                    <FontAwesomeIcon icon={faExpand} className='fullscreen-button videoPlayer__icons' onClick={toggleFullscreen} />
                                </div>

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default VideoPlayer;