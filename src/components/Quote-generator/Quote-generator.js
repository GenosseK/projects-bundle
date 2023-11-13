import './Quote-generator.css';
import { getQuotes } from '../../utils/QuoteAPI';
import { useEffect, useState } from 'react';
import { TelegramShareButton } from "react-share";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTelegram } from '@fortawesome/free-brands-svg-icons';

function QuoteGenerator() {

    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState([]);
    const [isLoading, setIsLoading] = useState(true);


    function newQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
    }

    useEffect(() => {
        setIsLoading(true);
        getQuotes()
            .then(data => {
                setQuotes(data);
                if (Object.keys(randomQuote).length === 0) {
                    const randomIndex = Math.floor(Math.random() * data.length);
                    setRandomQuote(data[randomIndex]);
                }
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [randomQuote]);

    function getShareMessage() {
        return `${randomQuote.text} - ${randomQuote.author}`;
    }

    return (
        <>
            <main>
                <section className='quoteGenerator'>
                    <div className='quoteGenerator__container' id='quote__container'>
                        <div className='quote__text-container'>

                            {isLoading ? (
                                <div className="skeleton-loader"></div>
                            ) : (
                                <>
                                    <FontAwesomeIcon icon={faQuoteLeft} />
                                    <span className='quote__text' id='quote'>{randomQuote.text}</span>
                                </>
                            )}
                        </div>

                        <div className='quote__author-container'>
                            {isLoading ? (
                                <div className="skeleton-loader"></div>
                            ) : (
                                <span className='quote__author' id='author'>{randomQuote.author}</span>
                            )}
                        </div>

                        <div className='quote__button-container'>
                            <TelegramShareButton url={window.location.href} title={getShareMessage()}>
                                <div className='quote__button button__share'>
                                    <FontAwesomeIcon icon={faTelegram} />
                                </div>
                            </TelegramShareButton>

                            <button className='quote__button button__new-quote' title='Generate new quote' onClick={newQuote}>New Quote</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default QuoteGenerator;