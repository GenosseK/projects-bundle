import { faBrush, faDownload, faEraser, faFillDrip, faSave, faTrashAlt, faUndoAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Paint-Clone.css';

function PaintClone() {
    return (
        <main className='PaintClone'>

            <div className='PaintClone__top-bar'>

                <div className='PaintClone__active-tool'>
                    <span className='PaintClone__active-tool_text' title='Active Tool'>Brush</span>
                </div>

                <div className='PaintClone__brush PaintClone__tool'>
                    <FontAwesomeIcon icon={faBrush} className='PaintClone__icon' />
                    <input className='PaintClone__jscolor' value='a51dab' />
                    <span className='PaintClone__size' title='Brush Size'>10</span>
                    <input className='PaintClone__slider' type='range' min='1' max='50' value='10' />
                </div>

                <div className='PaintClone__bucket PaintClone__tool'>
                    <FontAwesomeIcon icon={faFillDrip} title='Background Color' className='PaintClone__icon PaintClone__fill-drip' />
                    <input className='PaintClone__jscolor' value='ffffff' />
                </div>

                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faEraser} title='Eraser' className='PaintClone__icon' />
                </div>

                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faUndoAlt} title='Clear' className='PaintClone__icon PaintClone__undo-alt' />
                </div>

                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faDownload} title='Save Local Storage' className='PaintClone__icon' />
                </div>

                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faUpload} title='Load Local Storage' className='PaintClone__icon' />
                </div>

                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faTrashAlt} title='Clear Local Storage' className='PaintClone__icon PaintClone__trash-alt' />
                </div>

                <div className='PaintClone__tool'>
                    <a>
                        <FontAwesomeIcon icon={faSave} title='Save Local Storage' className='PaintClone__icon' />
                    </a>
                </div>

            </div>

            <canvas id="canvas" width="1920" height="914"></canvas>

            <div className='PaintClone__mobile-message'>
                <h2>Please use application on larger screen</h2>
            </div>

        </main>
    )
}

export default PaintClone;