class LocalStorageService {

    static addItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static getItem(key) {
        return localStorage.getItem(key);
    }

}

export default LocalStorageService