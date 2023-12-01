import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import './Book-Keeper.css';

function BookKeeper() {

    const [isPopupOpened, setIsPopupOpened] = useState(false);

    const openPopup = () => {
        setIsPopupOpened(true)
    }

    const closePopup = () => {
        setIsPopupOpened(false)
    }

    function closeByOverlay(evt) {
        if (evt.target === evt.currentTarget) {
            closePopup();
        }
      }
  

    return (
        <main className='bookKeeper'>

            <div className='bookKeeper__title_container' onClick={openPopup}>
                <h1 className='bookKeeper__title'>Add Bookmark</h1>
            </div>

            <div className='bookKeeper__bookMark_container'>
                <div className='bookMark'>
                    <FontAwesomeIcon icon={faTimes} className='bookMark__delete' />
                    <div className='bookMark__name'>
                        <img className='bookMark__image' src='' alt='Favicon' />
                        <a className='bookMark__link' href='' target='_blank'>GenosseK</a>
                    </div>
                </div>
                <div className='bookMark'>
                    <FontAwesomeIcon icon={faTimes} className='bookMark__delete' />
                    <div className='bookMark__name'>
                        <img className='bookMark__image' src='' alt='Favicon' />
                        <a className='bookMark__link' href='' target='_blank'>GenosseK</a>
                    </div>
                </div>
                <div className='bookMark'>
                    <FontAwesomeIcon icon={faTimes} className='bookMark__delete' />
                    <div className='bookMark__name'>
                        <img className='bookMark__image' src='' alt='Favicon' />
                        <a className='bookMark__link' href='' target='_blank'>GenosseK</a>
                    </div>
                </div>
            </div>



            <div  onMouseDown={closeByOverlay} className={`bookMark__creator__container ${isPopupOpened ? 'bookMark__creator__container_open' : ''}`}>

                <div className='creator'>
                    <FontAwesomeIcon icon={faTimes} className='creator__close-icon' onClick={closePopup} />
                    <div className='creator__title_container'>
                        <h3 className='creator__title'>Add Bookmark</h3>
                    </div>
                    <div className='bookMark__creator'>
                        <form className='bookMark__form'>

                            <div className='bookMark__form_website-input'>
                                <label className='website__label' htmlFor='website-name'>Website Name</label>
                                <input className='website__input' type='text' />
                            </div>

                            <div className='form-group_website-input'>
                                <label className='website__label' htmlFor='website-url'>Website URL</label>
                                <input className='website__input' type='text' />
                            </div>
                            <button className='bookMark__creator_submit-button' type='submit'>Save</button>
                        </form>
                    </div>
                </div>
            </div>

        </main>
    )
}

export default BookKeeper;