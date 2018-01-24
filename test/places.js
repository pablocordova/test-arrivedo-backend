const chai = require('chai');
const chaiHttp = require('chai-http');

const server = require('../app');
const app = server.app;

const config = require('../config/general');

const expect = chai.expect;

chai.use(chaiHttp);

// Variables

const queryOK = '?lat=40.722726166658305&lon=-73.996782318';
const queryWithoutLat = '?&lon=-73.996782318';
const queryWithoutLon= '?lat=40.722726166658305';
const queryInvalidLat = '?lat=hello&lon=-73.996782318';
const queryInvalidLon = '?lat=40.722726166658305&lon=';

describe('Places API routes', () => {

  describe('GET /v1/places/top10', () => {

    it('Get data successfully', done => {
      setTimeout(done, 5000);
      chai.request(app)
        .get('/v1/places/top10' + queryOK)
        .end((err, res) => {
          expect(res).to.have.status(config.STATUS.OK);
          expect(res).to.be.json;
          expect(res.body.message).to.be.equal(config.RES.OK);
          expect(res.body.result).to.exist;
          done();
        });
    });

    it('Failure due to lack latitude parameter', done => {

      chai.request(app)
        .get('/v1/places/top10' + queryWithoutLat)
        .end((err, res) => {
          expect(res).to.have.status(config.STATUS.BAD_REQUEST);
          expect(res).to.be.json;
          expect(res.body.message).to.be.equal(config.RES.MISSING_PARAMETERS);
          expect(res.body.result).to.exist;
          done();
        });
    });

    it('Failure due to lack logitude parameter', done => {

      chai.request(app)
        .get('/v1/places/top10' + queryWithoutLon)
        .end((err, res) => {
          expect(res).to.have.status(config.STATUS.BAD_REQUEST);
          expect(res).to.be.json;
          expect(res.body.message).to.be.equal(config.RES.MISSING_PARAMETERS);
          expect(res.body.result).to.exist;
          done();
        });
    });

    it('Failure due to invalid latitude', done => {

      chai.request(app)
        .get('/v1/places/top10' + queryInvalidLat)
        .end((err, res) => {
          expect(res).to.have.status(config.STATUS.BAD_REQUEST);
          expect(res).to.be.json;
          expect(res.body.message).to.be.equal(config.RES.NO_VALID);
          expect(res.body.result).to.exist;
          done();
        });

    });

    it('Failure due to invalid longitude', done => {

      chai.request(app)
        .get('/v1/places/top10' + queryInvalidLon)
        .end((err, res) => {
          expect(res).to.have.status(config.STATUS.BAD_REQUEST);
          expect(res).to.be.json;
          expect(res.body.message).to.be.equal(config.RES.NO_VALID);
          expect(res.body.result).to.exist;
          done();
        });

    });

  });


});