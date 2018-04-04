/*
const logger = require('../../common/logger');
const Tars = require("@tars/rpc").client;
const {Tarsapi} = require("../../providers/ucmsapiProxy");
Tars.initialize("./config.conf");
const prx = Tars.stringToProxy(Tarsapi.KVProxy, Tars.configure.get("main.KVServer"));

exports.getDocData = async (id) => {
    let success = function (result) {
        logger.debug("success.response.costtime:", result.response.costtime);
        //logger.debug("success.response:", result.response);
        return result.response.return;
    }

    let error = function (result) {
        logger.error("error.response.costtime:", result.response.costtime);
        logger.error("error.response:", result.response.error);
    }

    logger.debug("document id:", id);
    let docData = {};
    try {
        docData = await KVProxy.getDocument(parseInt(id)); //.then(success, error);    //6361923764438962523
        return  JSON.parse(docData);
    } catch (err) {
        logger.error(err)
    }
    return docData;
};*/
