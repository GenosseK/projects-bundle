import './Music-Player.css';
import image1 from '../../images/jacinto-1.jpg';
import audio1 from '../../music/jacinto-1.mp3';

function MusicPlayer() {
    return (
        <main>
            <section className='music-player'>
                <div className='music-player__container'>
                    <div className='image__container'>
                        <img className='album-image' src={image1} alt='Album Cover' />
                    </div>
                    <h2 className='song__title'>The title of the song</h2>
                    <h3 className='song__artist'>The artist of the song</h3>
                    <audio src={audio1} ></audio>
                    <div className='progress-bar__container'>
                        <div className='progress-bar'></div>
                        <div className='duration-wrapper'>
                            <span className='current-time'>0:00</span>
                            <span className='duration'>2:06</span>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    )
};

export default MusicPlayer;