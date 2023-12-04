import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState } from 'react';
import './Book-Keeper.css';

function BookKeeper() {

    const [isPopupOpened, setIsPopupOpened] = useState(false);
    const [bookmarks, setBookmarks] = useState([]);
    const [websiteName, setWebsiteName] = useState('');
    const [websiteUrl, setWebsiteUrl] = useState('');

    const openPopup = () => {
        setIsPopupOpened(true);
    };

    const closePopup = () => {
        setIsPopupOpened(false);
    };

    const closeByOverlay = (evt) => {
        if (evt.target === evt.currentTarget) {
            closePopup();
        }
    };

    const validate = (nameValue, urlValue) => {
        const expression = /(https)?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/g;
        const regex = new RegExp(expression);

        if (!nameValue || !urlValue) {
            alert('Please submit values for both fields.');
            return false;
        }

        if (!urlValue.match(regex)) {
            alert('Please provide a valid web address.');
            return false;
        }

        return true;
    };

    const storeBookmark = (e) => {
        e.preventDefault();
    
        
    
        let newUrl = websiteUrl.trim();
        
        if (!newUrl.match(/^(https?:\/\/)/i)) {
            newUrl = `https://${newUrl}`;
        }
    
        if (!validate(websiteName, newUrl)) {
            return;
        }

        const newBookmark = {
            name: websiteName,
            url: newUrl,
        };
    
        setBookmarks((prevBookmarks) => {
            const updatedBookmarks = [...prevBookmarks, newBookmark];
            localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
            return updatedBookmarks;
        });
    
        setWebsiteName('');
        setWebsiteUrl('');
        closePopup();
    };
    const deleteBookmark = (url) => {
        const updatedBookmarks = bookmarks.filter((bookmark) => bookmark.url !== url);
        setBookmarks(updatedBookmarks);
        localStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    };

    useEffect(() => {
        const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];

        if (storedBookmarks.length > 0) {
            setBookmarks(storedBookmarks);
        } else {
            setBookmarks([
                {
                    name: 'GenosseK',
                    url: 'https://github.com/GenosseK',
                },
            ]);
        }
    }, []);

    return (
        <main className='bookKeeper'>
            <div className='bookKeeper__title_container' onClick={openPopup}>
                <h1 className='bookKeeper__title'>Add Bookmark</h1>
            </div>

            <div className='bookKeeper__bookMark_container'>
                {bookmarks.map((bookmark, index) => (
                    <div className='bookMark' key={index}>
                        <FontAwesomeIcon
                            icon={faTimes}
                            className='bookMark__delete'
                            onClick={() => deleteBookmark(bookmark.url)}
                        />
                        <div className='bookMark__name'>
                            <img className='bookMark__image' src={`https://s2.googleusercontent.com/s2/favicons?domain=${bookmark.url}`} alt='Favicon' />
                            <a className='bookMark__link' href={bookmark.url} target='_blank' rel='noopener noreferrer'>
                                {bookmark.name}
                            </a>
                        </div>
                    </div>
                ))}
            </div>

            <div onMouseDown={closeByOverlay} className={`bookMark__creator__container ${isPopupOpened ? 'bookMark__creator__container_open' : ''}`}>
                <div className='creator'>
                    <FontAwesomeIcon icon={faTimes} className='creator__close-icon' onClick={closePopup} />
                    <div className='creator__title_container'>
                        <h3 className='creator__title'>Add Bookmark</h3>
                    </div>
                    <div className='bookMark__creator'>
                        <form className='bookMark__form' onSubmit={storeBookmark}>
                            <div className='bookMark__form_website-input'>
                                <label className='website__label' htmlFor='website-name'>
                                    Website Name
                                </label>
                                <input
                                    className='website__input'
                                    type='text'
                                    id='website-name'
                                    value={websiteName}
                                    onChange={(e) => setWebsiteName(e.target.value)}
                                />
                            </div>

                            <div className='form-group_website-input'>
                                <label className='website__label' htmlFor='website-url'>
                                    Website URL
                                </label>
                                <input
                                    className='website__input'
                                    type='text'
                                    id='website-url'
                                    value={websiteUrl}
                                    onChange={(e) => setWebsiteUrl(e.target.value)}
                                />
                            </div>
                            <button className='bookMark__creator_submit-button' type='submit'>
                                Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    );
}


export default BookKeeper;