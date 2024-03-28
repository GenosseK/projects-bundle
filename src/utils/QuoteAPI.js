import { quoteApi } from "./constants";

const handleResponseStatus = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`Error: ${response.status}`);
    }
}

const cleanQuotes = (quotes) => {
    return quotes.map(quote => {
        // Use a flexible regular expression to remove variations of "type.fit" from author
        quote.author = quote.author.replace(/,?\s?type\.fit\s?/i, '').trim();
        return quote;
    });
};


export const getQuotes = () => {
    return fetch(`${quoteApi}`)
        .then(handleResponseStatus)
        .then(cleanQuotes); // Clean quotes before returning
};