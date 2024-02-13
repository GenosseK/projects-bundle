import React, { useState, useEffect } from 'react';
import './Drag-and-Drop.css';

const defaultItems = {
    backlog: ['Release the course', 'Sit back and relax'],
    progress: ['Work on projects', 'Listen to music'],
    complete: ['Being cool', 'Getting stuff done'],
    onHold: ['Being uncool'],
};

function capitalizeFirstLetter(string) {
    if (string === 'onHold') {
        return 'On Hold';
    } else {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

function DragAndDrop() {
    const [columnStates, setColumnStates] = useState({
        backlog: false,
        progress: false,
        complete: false,
        onHold: false,
    });

    const [items, setItems] = useState({
        backlog: [],
        progress: [],
        complete: [],
        onHold: [],
    });

    const [hoverIndex, setHoverIndex] = useState(null);
    const [draggedItem, setDraggedItem] = useState(null);
    const [hoveredColumn, setHoveredColumn] = useState(null);

    useEffect(() => {
        const storedItems = JSON.parse(localStorage.getItem('kanbanItems'));
        if (storedItems) {
            setItems(storedItems);
        } else {
            setItems(defaultItems);
        }
    }, []);

    const toggleVisibility = (column) => {
        setColumnStates((prev) => ({
            ...prev,
            [column]: !prev[column],
        }));
    };

    const handleSaveItem = (column, index, newItem) => {
        const updatedItems = { ...items };
        updatedItems[column][index] = newItem;
        setItems(updatedItems);
        localStorage.setItem('kanbanItems', JSON.stringify(updatedItems));
        toggleVisibility(column);
    };

    const deleteItem = (column, index) => {
        const updatedItems = { ...items };
        updatedItems[column].splice(index, 1);
        setItems(updatedItems);
        localStorage.setItem('kanbanItems', JSON.stringify(updatedItems));
    };

    const handleAddItem = (column) => {
        toggleVisibility(column);
    };

    const handleEditItem = (column, index, newItem) => {
        if (newItem.trim() === "") {
            deleteItem(column, index);
        } else {
            const updatedItems = { ...items };
            updatedItems[column][index] = newItem;
            setItems(updatedItems);
            localStorage.setItem('kanbanItems', JSON.stringify(updatedItems));
        }
    };

    const handleDragStart = (column, index) => {
        setDraggedItem({ column, index });
    };

    const handleDragOver = (e, column) => {
        e.preventDefault();
        setHoveredColumn(column);
    };

    const handleDrop = (targetColumn) => {
        const { column: sourceColumn, index: sourceIndex } = draggedItem;
        const updatedItems = { ...items };
        const draggedItemContent = updatedItems[sourceColumn][sourceIndex];

        // Remove item from source column
        updatedItems[sourceColumn].splice(sourceIndex, 1);

        // Add item to target column
        updatedItems[targetColumn].splice(hoverIndex, 0, draggedItemContent);

        setItems(updatedItems);
        localStorage.setItem('kanbanItems', JSON.stringify(updatedItems));

        // Reset drag state
        setDraggedItem(null);
        setHoveredColumn(null);
    };

    return (
        <main className='dragAndDrop'>
            <h1 className='dragAndDrop__main-title'>Kanban Board</h1>
            <div className='dragAndDrop__drag-container'>
                <ul className='drag-container__drag-list'>
                    {Object.keys(columnStates).map((column) => (
                        <li
                            key={column}
                            className={`drag-list__drag-column ${hoveredColumn === column ? `${column}-column` : ''}`}
                            onDragOver={(e) => handleDragOver(e, column)}
                            onDrop={() => handleDrop(column)}
                        >
                            <span className={`drag-column__${column}-header-container drag-column__header-container`}>
                                <h1 className='drag-column__header'>{capitalizeFirstLetter(column)}</h1>
                            </span>
                            <div className='drag-column__custom-scroll'>
                                <ul className='drag-column__drag-item-list'>
                                    {items[column].map((item, index) => (
                                        <li
                                            key={index}
                                            className='drag-item'
                                            draggable='true'
                                            onDragStart={() => handleDragStart(column, index)}
                                            onMouseEnter={() => setHoverIndex(index)}
                                            onMouseLeave={() => setHoverIndex(null)}
                                        >
                                            <span contentEditable="true" onBlur={(e) => handleEditItem(column, index, e.target.innerText)}>{item}</span>
                                            {hoverIndex === index && (
                                                <button className="delete-button" onClick={() => deleteItem(column, index)}>X</button>
                                            )}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className='drag-column__btn-group'>
                                <div className='drag-column__add-btn' onClick={() => handleAddItem(column)}>
                                    <span className='drag-column__plus-sign'>+</span>
                                    <span className='drag-column__btn-title'>Add Item</span>
                                </div>
                                {columnStates[column] && (
                                    <div className={`drag-column__add-btn drag-column__add-btn_solid_${column} drag-column__add-btn_solid`} onClick={() => handleSaveItem(column, items[column].length, document.querySelector(`.add-container__add-item[data-column="${column}"]`).innerText)}>
                                        <span className='drag-column__btn-title'>Save Item</span>
                                    </div>
                                )}
                            </div>
                            {columnStates[column] && (
                                <div className='drag-column__add-container'>
                                    <div className='add-container__add-item' contentEditable="true" data-column={column}></div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </main>
    );
}

export default DragAndDrop;
