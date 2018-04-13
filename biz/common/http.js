const rp = require('request-promise');
const logger = require('./logger');

class HTTPTools {
    /**
     *
     * @param {*} options
     * @param {*} handleRes
     * @param {*} handleErr
     */
    async doRequest(options) {
        const startTime = new Date();

        try {
            const ret = await rp(options);

            logger.info(
                `http service response ok and takes ${new Date() - startTime}ms. options:${options}. body:${ret}`,
            );

            return ret;
        } catch (err) {
            logger.error(`http service response error:${err},options:${options}`);
            throw err;
        }
    }

    async get(url, params) {
        const options = {
            url,
            method: 'GET',
            qs: params,
        };
        const ret = await this.doRequest(options);

        return ret;
    }

    async post(url, params) {
        const options = {
            url,
            method: 'POST',
            form: params,
        };
        const ret = await this.doRequest(options);

        return ret;
    }

    async postJSON(url, params) {
        const options = {
            url,
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(params),
        };
        const ret = await this.doRequest(options);

        return ret;
    }
}

module.exports = new HTTPTools();
