import { unsplashApiUrl } from "./constants";


const authorizationKey = 'TaXJ52zkwbvN81fh5H_7NckCwf9Bqo2zC3n7n2T3ec4'

class UnsplashApi {
    constructor({ baseURL, headers }) {
        this._baseURL = baseURL;
        this._headers = headers;
    }

    _handleResponseStatus(response) {
        if (response.ok) {
            return response.json();
        } else {
            return Promise.reject(`Error: ${response.status}`);
        }
    }

    getPhotos(count) {
        return fetch(`${this._baseURL}/photos/random?count=${count}`, {
            method: 'GET',
            headers: this._headers,
        }).then(this._handleResponseStatus)
    }

}

const unsplashApi = new UnsplashApi({
    baseURL: unsplashApiUrl,
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Client-ID ${authorizationKey}`,
        'Accept-Version': 'v1',
    }
});

export default unsplashApi;