import { useState, useEffect, useRef } from 'react';
import { faBrush, faDownload, faEraser, faFillDrip, faSave, faTrashAlt, faUndoAlt, faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Paint-Clone.css';

function PaintClone() {
    const [isDrawing, setIsDrawing] = useState(false);
    const canvasRef = useRef(null);
    const contextRef = useRef(null);
    const [brushSize, setBrushSize] = useState(10);
    const [brushColor, setBrushColor] = useState('#a51dab');
    const [canvasColor, setCanvasColor] = useState('#FFFFFF');
    const [appliedCanvasColor, setAppliedCanvasColor] = useState('#FFFFFF');

    const [currentTool, setCurrentTool] = useState('brush');
    const [message, setMessage] = useState('');

    useEffect(() => {
        const canvas = canvasRef.current;

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const context = canvas.getContext('2d');

        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);

        context.lineCap = 'round';
        context.strokeStyle = brushColor;
        context.lineWidth = 10;

        contextRef.current = context;
    }, []);

    const startDrawing = ({ nativeEvent }) => {
        const { offsetX, offsetY } = nativeEvent;
        contextRef.current.beginPath();
        contextRef.current.moveTo(offsetX, offsetY);
        setIsDrawing(true);
    };

    const draw = ({ nativeEvent }) => {
        if (!isDrawing) return;
        const { offsetX, offsetY } = nativeEvent;
        if (currentTool === 'eraser') {
            contextRef.current.strokeStyle = appliedCanvasColor;
        } else {
            contextRef.current.strokeStyle = brushColor;
        }
        contextRef.current.lineTo(offsetX, offsetY);
        contextRef.current.stroke();
    };
    const endDrawing = () => {
        contextRef.current.closePath();
        setIsDrawing(false);
    };

    const toggleTool = (tool) => {
        setCurrentTool(tool);
    };

    const handleBrushColorChange = (e) => {
        setBrushColor(e.target.value);
        contextRef.current.strokeStyle = brushColor;
    };

    const handleCanvasColorChange = (e) => {
        setCanvasColor(e.target.value);
        contextRef.current.fillStyle = canvasColor;
    };

    const handleSizeChange = (e) => {
        setBrushSize(e.target.value);
        contextRef.current.lineWidth = brushSize;
    };

    const handleFillCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = canvasColor;
        context.fillRect(0, 0, canvas.width, canvas.height);
        setAppliedCanvasColor(canvasColor);
    };

    const handleSaveCanvasToLocalStorage = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL();
        localStorage.setItem('savedCanvas', dataURL);
        setMessage('Canvas Saved');
        setTimeout(() => setMessage(''), 2000);
    };

    const handleLoadCanvasFromLocalStorage = () => {
        const savedCanvas = localStorage.getItem('savedCanvas');
        if (savedCanvas) {
            const img = new Image();
            img.onload = () => {
                contextRef.current.drawImage(img, 0, 0);
                setMessage('Canvas Loaded');
                setTimeout(() => setMessage(''), 2000);
            };
            img.src = savedCanvas;
        } else {
            setMessage('No Saved Canvas');
            setTimeout(() => setMessage(''), 2000);
        }
    };

    const handleSaveCanvas = () => {
        const canvas = canvasRef.current;
        const dataURL = canvas.toDataURL('image/jpeg');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'canvas_image.jpg';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setMessage('Canvas Saved');
        setTimeout(() => setMessage(''), 2000);
    };

    const handleClearLocalStorage = () => {
        localStorage.removeItem('savedCanvas');
        setMessage('Saved Canvas Cleared');
        setTimeout(() => setMessage(''), 2000);
    };

    const handleClearCanvas = () => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.fillStyle = 'white';
        context.fillRect(0, 0, canvas.width, canvas.height);
        setAppliedCanvasColor('white')
        setMessage('Canvas Cleared');
        setTimeout(() => setMessage(''), 2000);
    };

    return (
        <main className='PaintClone'>

            <div className='PaintClone__top-bar'>

                <div className='PaintClone__active-tool'>
                <span className='PaintClone__active-tool_text' title='Active Tool'>
                        {message ? message : (currentTool === 'eraser' ? 'Eraser' : (currentTool === 'brush' ? 'Brush' : ''))}
                    </span>
                </div>

                <div className={`PaintClone__brush PaintClone__tool ${currentTool === 'brush' ? 'active' : ''}`} >
                    <FontAwesomeIcon icon={faBrush} className='PaintClone__icon' onClick={() => toggleTool('brush')} />
                    <input className='PaintClone__jscolor' type='color' defaultValue='#a51dab' onChange={handleBrushColorChange} />
                    <span className='PaintClone__size' title='Brush Size'>{brushSize}</span>
                    <input className='PaintClone__slider' type='range' min='1' max='50' defaultValue='10' onChange={handleSizeChange} />
                </div>

                <div className='PaintClone__bucket PaintClone__tool'>
                    <FontAwesomeIcon icon={faFillDrip} title='Fill Canvas' onClick={handleFillCanvas} className='PaintClone__icon PaintClone__fill-drip' />
                    <input className='PaintClone__jscolor' type='color' value={canvasColor} onChange={handleCanvasColorChange} />
                </div>

                <div className={`PaintClone__tool ${currentTool === 'eraser' ? 'active' : ''}`} onClick={() => toggleTool('eraser')}>
                    <FontAwesomeIcon icon={faEraser} title='Eraser' className='PaintClone__icon' />
                </div>

                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faUndoAlt} title='Clear' className='PaintClone__icon PaintClone__undo-alt' onClick={handleClearCanvas} />
                </div>

                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faDownload} title='Save Local Storage' className='PaintClone__icon' onClick={handleSaveCanvasToLocalStorage} />
                </div>
                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faUpload} title='Load Local Storage' className='PaintClone__icon' onClick={handleLoadCanvasFromLocalStorage} />
                </div>
                <div className='PaintClone__tool'>
                    <FontAwesomeIcon icon={faTrashAlt} title='Clear Local Storage' className='PaintClone__icon PaintClone__trash-alt' onClick={handleClearLocalStorage} />
                </div>

                <div className='PaintClone__tool'>
                    <a>
                        <FontAwesomeIcon icon={faSave} title='Download Image' className='PaintClone__icon' onClick={handleSaveCanvas} />
                    </a>
                </div>

            </div>

            <canvas
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseOut={endDrawing}
            />

            <div className='PaintClone__mobile-message'>
                <h2>Please use application on larger screen</h2>
            </div>

        </main>
    )
}

export default PaintClone;