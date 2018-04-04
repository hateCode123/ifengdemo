const rp = require('request-promise');
const config = require('config');
const logger = require('./logger');


class HTTPTools {
    /**
     * 
     * @param {*} options 
     * @param {*} handleRes 
     * @param {*} handleErr 
     */
    async doRequest(options) {
        let startTime = new Date();
        try {
            let ret = await rp(options);
            logger.info(`http service response ok and takes ${new Date()-startTime}ms. options:${options}. body:${ret}`);
            return ret;
        } catch (err) {
            logger.error(`http service response error:${err},options:${options}`);
            throw err;
        }
    }

    async get(url, params) {
        let options = {
            url,
            method: 'GET',
            qs: params
        };
        let ret = await this.doRequest(options);
        return ret;
    }

    async post(url, params) {
        let options = {
            url: url,
            method: 'POST',
            form: params
        };
        let ret = await this.doRequest(options);
        return ret;
    }

    async postJSON(url, params) {
        let options = {
            url,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(params)
        };
        let ret = await this.doRequest(options);
        return ret;
    }
}

module.exports = new HTTPTools();