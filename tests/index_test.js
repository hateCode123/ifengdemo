process.env.NODE_ENV = 'test';
const http = require('./common');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should;

describe('application test', () => {
    // before(() => {});
    // after(() => {});

    it('GET /index', async() => {
        let res = await http.get('/index');
        res.should.have.status(200);
    });
});