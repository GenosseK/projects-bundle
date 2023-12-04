import React, { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Video-Player.css';
import { faExpand, faPlay, faVolumeUp, faPause } from '@fortawesome/free-solid-svg-icons';

function VideoPlayer() {
    return (
        <main className='videoPlayer_main'>
            <div className='videoPlayer'>
                <video className="videoPlyer__video" src='https://pixabay.com/videos/download/video-31377_tiny.mp4?attachment' playsInline></video>
                <div className='videoPlayer__container'>

                    <div className='videoPlayer__video-controls__container'>

                        <div className='video-controls__progress-bar__contaier'>
                            <div className='progress-bar__video-bar'></div>
                        </div>

                        <div className='video-controls__playback-controls'>

                            <div className='playback-controls__controls-left'>
                                <div className='controls-left__play-button__container'>
                                    <FontAwesomeIcon icon={faPlay} className='controls-left__play-button videoPlayer__icons'></FontAwesomeIcon>
                                </div>
                                <div className='controls-left__volume__container'>
                                    <div className='controls-left__volume-button_container'>
                                        <FontAwesomeIcon icon={faVolumeUp} className='controls-left__volume-button videoPlayer__icons' />
                                    </div>
                                    <div className='controls-left__volume-bar__container'>
                                        <div className='controls-left__volume-bar'></div>
                                    </div>
                                </div>
                            </div>

                            <div className='playback-controls__controls-right'>

                                <div className='controls-right__player-speed__container'>
                                    <select className='player-speed__selector'>
                                        <option value="0.5" className='selector__option'>0.5 x</option>
                                        <option value="0.75" className='selector__option'>0.75 x</option>
                                        <option value="1" defaultValue className='selector__option'>1.0 x</option>
                                        <option value="1.5" className='selector__option'>1.5 x</option>
                                        <option value="2" className='selector__option'>2.0 x</option>
                                    </select>
                                </div>

                                <div className='controls-right__video-time__container'>
                                    <span className='video-time_elapsed'>00:00 / </span>
                                    <span className='video-time_duration'>02:49</span>
                                </div>

                                <div className='controls__fullscreen-button__container'>
                                    <FontAwesomeIcon icon={faExpand} className='fullscreen-button videoPlayer__icons' />
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