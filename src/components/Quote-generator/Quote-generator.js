import './Quote-generator.css';
import { getQuotes } from '../../utils/QuoteAPI';
import { useEffect, useState } from 'react';

function QuoteGenerator() {

    const [quotes, setQuotes] = useState([]);
    const [randomQuote, setRandomQuote] = useState([]);

    function newQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setRandomQuote(quotes[randomIndex]);
    }

    useEffect(() => {
        getQuotes()
            .then(data => {
                setQuotes(data);
                const randomIndex = Math.floor(Math.random() * data.length);
                setRandomQuote(data[randomIndex]);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);
/*
    function shareOnVk() {
        const vkApiUrl = 'https://api.vk.com/method/wall.post';
        const accessToken = 'vk1.a.7Io-TPeohTyYsAfxsMogaufOeWRFq5VBKAF5BJAUS4cYFRh7aayoVnI32VWxTnqjRJyvYq2xD0DcSLsjQW6QjTtG4R34SHfnmt0uh7xnDTxcwneXwNiVan9i5RmIwahikHPd56LR6z9adCJ4RqHgpiILgg7Grkti0oQqX5gwS24uQdj5L5zNEPyxjXDfx4UCJOAMpTWaFeFx3x8bn3uh2w'; // Здесь укажите свой access token VK
        const ownerId = '80271825'; // Здесь укажите ID своей страницы ВКонтакте
        const message = `Цитата: "${randomQuote.text}" - ${randomQuote.author || 'Unknown'}`; // Сообщение для публикации
      
        // Создайте параметры запроса для API ВКонтакте
        const params = new URLSearchParams({
          access_token: accessToken,
          owner_id: ownerId,
          message: message,
        });
      
        // Отправьте POST-запрос на API ВКонтакте для публикации записи
        fetch(vkApiUrl, {
          method: 'POST',
          body: params,
        })
          .then(response => response.json())
          .then(data => {
            if (data.response && data.response.post_id) {
              alert('Запись успешно опубликована на стене ВКонтакте!');
            } else {
              alert('Не удалось опубликовать запись на стене ВКонтакте.');
            }
          })
          .catch(error => {
            console.error('Ошибка при публикации на ВКонтакте:', error);
          });
      }
      

    //'https://oauth.vk.com/blank.html#access_token=vk1.a.7Io-TPeohTyYsAfxsMogaufOeWRFq5VBKAF5BJAUS4cYFRh7aayoVnI32VWxTnqjRJyvYq2xD0DcSLsjQW6QjTtG4R34SHfnmt0uh7xnDTxcwneXwNiVan9i5RmIwahikHPd56LR6z9adCJ4RqHgpiILgg7Grkti0oQqX5gwS24uQdj5L5zNEPyxjXDfx4UCJOAMpTWaFeFx3x8bn3uh2w&expires_in=86400&user_id=80271825'
*/

    return (
        <>
            <main>
                <section className='quoteGenerator'>
                    <div className='quoteGenerator__container' id='quote__container'>

                        <div className='quote__text-container'>
                            <i className='fa fa-quote-left'></i>
                            <span className='quote__text' id='quote'>{randomQuote.text}</span>
                        </div>

                        <div className='quote__author-container'>
                            <span className='quote__author' id='author'>{randomQuote.author}</span>
                        </div>

                        <div className='quote__button-container'>
                            <button className='quote__button button__share fa fa-vk' id='vk-link' title='Share it on Vk'></button>
                            <button className='quote__button button__new-quote' title='Generate new quote' onClick={newQuote}>New Quote</button>
                        </div>
                    </div>
                </section>

            </main>

        </>
    )
}

export default QuoteGenerator;