import { voiceRssApi } from "./constants";

const voiceRssApiKey = 'bd91128c25dd48cbbc4df115292da0b6';

const handleResponseStatus = (response) => {
    if (response.ok) {
        return response.blob();
    } else {
        return Promise.reject(`Error: ${response.status}`);
    }
};

export const convertText = (jokeText) => {
    return fetch(`${voiceRssApi}key=${voiceRssApiKey}&hl=en-us&v=Alice&src=${jokeText}`)
        .then(handleResponseStatus);
};