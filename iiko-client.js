'use strict'

const axios = require('axios').default;

class IikoClient {

    #_api = {
        address: null,
        login: null,
        baseURL: "api/1/"
    };

    #_client;

    /**
     *
     * @param address {String} required address
     * @param login {String} required login
     */

    constructor(address, login) {
        this.#_api.address = address;
        this.#_api.login = login;
    }

    /**
     *
     * @returns {Promise<void>}
     */

    async connect(){
        try{
            let result = await axios.post(`${this.#_api.address}${this.#_api.baseURL}access_token`, {
                "apiLogin": this.#_api.login
            });
            this.#_client = axios.create({
                baseURL: `${this.#_api.address}${this.#_api.baseURL}`,
                timeout: 1000,
                headers: {'Authorization': `Bearer ${result.data.token}`}
            });
        }catch (err){
            throw Error(err);
        }
    }

    /**
     *
     * @param method {String} required http request method iiko API tells you to use for given endpoint
     * @param endpoint {String} required endpoint which you are trying to reach (those can be found in iiko API documentation)
     * @param query {String} optional query string
     * @param options {Object} optional options (request body)
     * @param retry {Boolean} optional property used internally to retry request if token Bearer token expired.
     * @returns {Promise<*>}
     */

    async request(method, endpoint, query = "", options, retry = true){
        try{
            let result = await this.#_client[method](`${endpoint}?${query}`, options);
            return result.data;
        }catch (err){
            if (err.response) {
                if(retry){
                    try{
                        await this.connect();
                        let result = await this.request(method, endpoint, query = "", options, retry = false);
                        return result;
                    }catch (err){
                        throw Error(err);
                    }
                }else{
                    throw Error(err);
                }
            }else{
                throw Error(err);
            }
        }
    }

}

module.exports = IikoClient;
