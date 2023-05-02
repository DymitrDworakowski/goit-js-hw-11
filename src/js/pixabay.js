import axios from "axios";
axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '35794671-989ac978d0f5c3155771be810';
const PARAM = 'per_page=40&orientation=horizontal&image_type=photo&safesearch=true';

class pixabayImages {
    constructor(){
        this.searchQuery = '';
        this.page = 1;
    }

    async fetchImages () {
        try{
            const response = await axios.get(`/?key=${API_KEY}&q=${this.searchQuery}&page=${this.page}&${PARAM}`);
            this.incrementPage();
            return response;
        
        } catch (error) {
            console.log(error);
        }
    }

    incrementPage() {
        this.page += 1;
    }

    resetPage() {
        this.page = 1;
    }
}

export { pixabayImages };

