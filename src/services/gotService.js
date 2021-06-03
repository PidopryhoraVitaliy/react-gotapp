
export default class GotService {

    constructor() {
        this._apiBase = 'https://www.anapioficeandfire.com/api';
    }

    async getResource(url) {
        const res = await fetch(this._apiBase + url);
        if (!res.ok) {
            throw new Error(`Cannot fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }

    async getAllCharacters() {
        const res = await this.getResource(`/characters?page=5&pageSize=10`);
        return res.map(this._transformCharacter);
    }
    async getCharacter(id) {
        const character = await this.getResource(`/characters/${id}`);
        return this._transformCharacter(character);
    }

    async getAllBooks() {
        const res = await this.getResource(`/books`);
        return res.map(this._transformBook);
    }
    async getBook(id) {
        const book = await this.getResource(`/books/${id}`);
        return this._transformBook(book);
    }
    
    async getAllHouses() {
        const res = await this.getResource(`/houses`);
        return res.map(this._transformHouse);
    }
    async getHouse(id) {
        const house = this.getResource(`/houses/${id}`);
        return this._transformHouse(house);
    }

    formatString = srt => {
        const trimStr = srt.trim();
        if (trimStr.length === 0) {
            return '---';
        }
        return trimStr;
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
            name: this.formatString(book.name),
            numberOfPages: this.formatString(book.numberOfPages),
            publiser: this.formatString(book.publiser),
            released: this.formatString(book.released)
        };
    }

}