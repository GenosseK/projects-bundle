import React, { useState, useEffect } from 'react';
import './Drag-and-Drop.css';

function DragAndDrop() {

    const [columnStates, setColumnStates] = useState({
        backlog: false,
        progress: false,
        complete: false,
        onHold: false,
      });


      const toggleVisibility = (column) => {
        setColumnStates((prev) => ({
          ...prev,
          [column]: !prev[column],
        }));
      };
    

    return (
        <main className='dragAndDrop'>
            <h1 className='dragAndDrop__main-title'>Kanban Board</h1>

            <div className='dragAndDrop__drag-container'>
                <ul className='drag-container__drag-list'>

                    <li className='drag-list__drag-column backlog-column'>

                        <span className='drag-column__backlog-header-container drag-column__header-container'>
                            <h1 className='drag-column__header'>Backlog</h1>
                        </span>

                        <div className='drag-column__custom-scroll'>
                            <ul className='drag-column__drag-item-list'>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                            </ul>
                        </div>

                        <div className='drag-column__btn-group'>
                            <div className='drag-column__add-btn' onClick={() => toggleVisibility('backlog')}>
                                <span className='drag-column__plus-sign'>+</span>
                                <span className='drag-column__btn-title'>Add Item</span>
                            </div>
                            {columnStates.backlog && (<div className='drag-column__add-btn drag-column__add-btn_solid_backlog drag-column__add-btn_solid'>
                                <span className='drag-column__btn-title'>Save Item</span>
                            </div>)}
                        </div>
                        {columnStates.backlog && (
                            <div className='drag-column__add-container'>
                                <div className='add-container__add-item' contentEditable="true"></div>
                            </div>)}

                    </li>

                    <li className='drag-list__drag-column progress-column'>

                        <span className='drag-column__progress-header-container drag-column__header-container'>
                            <h1 className='drag-column__header'>Progress</h1>
                        </span>

                        <div className='drag-column__custom-scroll'>
                            <ul className='drag-column__drag-item-list'>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                            </ul>
                        </div>

                        <div className='drag-column__btn-group'>
                            <div className='drag-column__add-btn' onClick={() => toggleVisibility('progress')}>
                                <span className='drag-column__plus-sign'>+</span>
                                <span className='drag-column__btn-title'>Add Item</span>
                            </div>
                            {columnStates.progress && (
                            <div className='drag-column__add-btn drag-column__add-btn_solid_progress drag-column__add-btn_solid'>
                                <span className='drag-column__btn-title'>Save Item</span>
                            </div>)}
                        </div>
                        {columnStates.progress && (
                        <div className='drag-column__add-container'>
                            <div className='add-container__add-item' contentEditable="true"></div>
                        </div>)}

                    </li>

                    <li className='drag-list__drag-column complete-column'>

                        <span className='drag-column__complete-header-container drag-column__header-container'>
                            <h1 className='drag-column__header'>Complete</h1>
                        </span>

                        <div className='drag-column__custom-scroll'>
                            <ul className='drag-column__drag-item-list'>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                            </ul>
                        </div>

                        <div className='drag-column__btn-group'>
                            <div className='drag-column__add-btn' onClick={() => toggleVisibility('complete')}>
                                <span className='drag-column__plus-sign'>+</span>
                                <span className='drag-column__btn-title'>Add Item</span>
                            </div>
                            {columnStates.complete && (
                            <div className='drag-column__add-btn drag-column__add-btn_solid_complete drag-column__add-btn_solid'>
                                <span className='drag-column__btn-title'>Save Item</span>
                            </div>)}
                        </div>
                        {columnStates.complete && (
                        <div className='drag-column__add-container'>
                            <div className='add-container__add-item' contentEditable="true"></div>
                        </div>)}

                    </li>

                    <li className='drag-list__drag-column on-hold-column'>

                        <span className='drag-column__on-hold-header-container drag-column__header-container'>
                            <h1 className='drag-column__header'>On Hold</h1>
                        </span>

                        <div className='drag-column__custom-scroll'>
                            <ul className='drag-column__drag-item-list'>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                                <li className='drag-item'>Testing</li>
                            </ul>
                        </div>

                        <div className='drag-column__btn-group'>
                            <div className='drag-column__add-btn' onClick={() => toggleVisibility('onHold')}>
                                <span className='drag-column__plus-sign'>+</span>
                                <span className='drag-column__btn-title'>Add Item</span>
                            </div>
                            {columnStates.onHold && (
                            <div className='drag-column__add-btn drag-column__add-btn_solid_on-hold drag-column__add-btn_solid'>
                                <span className='drag-column__btn-title'>Save Item</span>
                            </div>)}
                        </div>
                        {columnStates.onHold && (
                        <div className='drag-column__add-container'>
                            <div className='add-container__add-item' contentEditable="true"></div>
                        </div>)}

                    </li>

                </ul>
            </div>
        </main>
    )
}

export default DragAndDrop;