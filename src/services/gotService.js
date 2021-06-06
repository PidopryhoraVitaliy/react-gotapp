
export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    getResource = async (url) => {
        const res = await fetch(this._apiBase + url);
        if (!res.ok) {
            throw new Error(`Cannot fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    getAllCharacters = async () => {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    getCharacter = async (id) => {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    getAllBooks = async () => {
        const res = await this.getResource(`/books`);
        return res.map(this._transformBook);
    }
    getBook = async (id) => {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    
    getAllHouses = async () => {
        const res = await this.getResource(`/houses`);
        return res.map(this._transformHouse);
    }
    getHouse = async (id) => {
        const house = await this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    formatString = srt => {
        if (srt) {
            return srt;
        }
        return '---';
    }

    getIdFromUrl = url => {
        const match = url.match(/(\d+)(?!.*\d)/);
        if (match === null) {
            throw Error(`Cannot get id from url: ${url}`);
        }
        return match[1];
    }

    _transformCharacter = (char) => {
        return {
            id: this.getIdFromUrl(char.url),
            name: this.formatString(char.name),
            gender: this.formatString(char.gender),
            born: this.formatString(char.born),
            died: this.formatString(char.died),
            culture: this.formatString(char.culture),
        }
    }

    _transformHouse = (house) => {
        return {
            id: this.getIdFromUrl(house.url),
            name: this.formatString(house.name),
            region: this.formatString(house.region),
            words: this.formatString(house.words),
            titles: this.formatString(house.titles),
            overlord: this.formatString(house.overlord),
            ancestralWeapons: this.formatString(house.ancestralWeapons)
        };
    }
    
    _transformBook = (book) => {
        return {
            id: this.getIdFromUrl(book.url),
            name: this.formatString(book.name),
            numberOfPages: this.formatString(book.numberOfPages),
            publiser: this.formatString(book.publiser),
            released: this.formatString(book.released)
        };
    }

}