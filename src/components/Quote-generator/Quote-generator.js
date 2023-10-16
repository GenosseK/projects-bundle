import './Quote-generator.css';
import { getQuotes } from '../../utils/QuoteAPI';
import { useEffect, useState } from 'react';
import { VKShareButton } from "react-share";


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
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomQuote(data[randomIndex]);
            })
            .catch(error => {
                console.error(error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

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
                                    <i className='fa fa-quote-left'></i>
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
                            <VKShareButton title={getShareMessage()} url={window.location.href}>
                                <div className='quote__button button__share'>
                                    <i className='fa fa-vk' title='Share it on Vk'></i>
                                </div>
                            </VKShareButton>
                            <button className='quote__button button__new-quote' title='Generate new quote' onClick={newQuote}>New Quote</button>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default QuoteGenerator;