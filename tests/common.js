process.env.NODE_ENV = 'development';

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../biz/app');

chai.should();
chai.use(chaiHttp);

let http = chai.request(app);

module.exports = http;