import { quoteApi } from "./constants";

const handleResponseStatus = (response) => {
    if (response.ok) {
        return response.json();
    } else {
        return Promise.reject(`Error: ${response.status}`);
    }
}

export const getQuotes = () => {
    return fetch(`${quoteApi}`)
        .then(handleResponseStatus);
};