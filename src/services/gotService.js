
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
            return '-';
        }
        return trimStr;
    }

    _transformCharacter(char) {
        return {
            name: this.formatString(char.name),
            gender: this.formatString(char.gender),
            born: this.formatString(char.born),
            died: this.formatString(char.died),
            culture: this.formatString(char.culture),
        }
    }

    _transformHouse(house) {
        return {
            name: house.name,
            region: house.region,
            words: house.words,
            titles: house.titles,
            overlord: house.overlord,
            ancestralWeapons: house.ancestralWeapons
        };
    }
    
    _transformBook(book) {
        return {
            name: book.name,
            numberOfPages: book.numberOfPages,
            publiser: book.publiser,
            released: book.released
        };
    }

}