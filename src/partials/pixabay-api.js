import axios from "axios";

export class PixabayAPI {
    static API_KEY = '40710418-a9040daf56137e15a2a6af40a'
    constructor() {
        this.query = 0;
        this.page = 1;
        axios.defaults.baseURL = 'https://pixabay.com';

    }
    fetchImagesByQuery() {
        const options = {
            params: {
                key: PixabayAPI.API_KEY,
                q: this.query,
                image_type: 'photo',
                orientation: 'horizontal',
                safesearch: true,
                page: this.page,
                per_page: 40
            },
        }

        return axios.get('/api/', options);

    }
}
