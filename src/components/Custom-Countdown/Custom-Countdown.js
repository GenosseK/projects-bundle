import './Custom-Countdown.css';
import timeVideo from '../../images/time.mp4';

function CustomCountdown() {
    return (
        <main>
            <div className='countdown__container'>
                <video className='countdown__video' src={timeVideo} loop muted autoPlay />
                <div className='video__overlay'></div>
            </div>
        </main>
    )
};

export default CustomCountdown;