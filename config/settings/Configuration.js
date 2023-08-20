/**
 * Date: 18/08/2023
 * Author: Guillon Alain
 * Version: 1.0.1
 * ------------------------------------------------------------------------------------------------------------
 * Editer la ligne 42 selon votre configuration, à savoir le 3ème arguments est une chaine de caractère vide
 */

class Configuration {
    constructor(myIPLocal, portAPI, apiKEY) {
        this._myIPLocal = myIPLocal;
        this._portAPI = portAPI;
        this._apiKEY = apiKEY;
    }

    // IP REACT NATIVE APP
    getMyIPLocal() {
        return this._myIPLocal;
    }
    setMyIPLocal(string) {
        this._myIPLocal = string;
    }

    // PORT API
    getPortAPI() {
        return this._portAPI;
    }
    setPortAPI(string) {
        this._portAPI = string;
    }

    // API KEY
    getApiKEY() {
        return this._apiKEY;
    }
    setApiKEY(string) {
        this._apiKEY = string;
    }
}

// Création d'un Singleton (Instance Unique)
const configSingleton = new Configuration('192.168.1.12', '3000', '');

export default configSingleton;
