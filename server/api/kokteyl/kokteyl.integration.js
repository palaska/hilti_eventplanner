'use strict';

var app = require('../..');
var request = require('supertest');

var newKokteyl;

describe('Kokteyl API:', function() {

  describe('GET /api/kokteyls', function() {
    var kokteyls;

    beforeEach(function(done) {
      request(app)
        .get('/api/kokteyls')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          kokteyls = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      kokteyls.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/kokteyls', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/kokteyls')
        .send({
          name: 'New Kokteyl',
          info: 'This is the brand new kokteyl!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newKokteyl = res.body;
          done();
        });
    });

    it('should respond with the newly created kokteyl', function() {
      newKokteyl.name.should.equal('New Kokteyl');
      newKokteyl.info.should.equal('This is the brand new kokteyl!!!');
    });

  });

  describe('GET /api/kokteyls/:id', function() {
    var kokteyl;

    beforeEach(function(done) {
      request(app)
        .get('/api/kokteyls/' + newKokteyl._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          kokteyl = res.body;
          done();
        });
    });

    afterEach(function() {
      kokteyl = {};
    });

    it('should respond with the requested kokteyl', function() {
      kokteyl.name.should.equal('New Kokteyl');
      kokteyl.info.should.equal('This is the brand new kokteyl!!!');
    });

  });

  describe('PUT /api/kokteyls/:id', function() {
    var updatedKokteyl

    beforeEach(function(done) {
      request(app)
        .put('/api/kokteyls/' + newKokteyl._id)
        .send({
          name: 'Updated Kokteyl',
          info: 'This is the updated kokteyl!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedKokteyl = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedKokteyl = {};
    });

    it('should respond with the updated kokteyl', function() {
      updatedKokteyl.name.should.equal('Updated Kokteyl');
      updatedKokteyl.info.should.equal('This is the updated kokteyl!!!');
    });

  });

  describe('DELETE /api/kokteyls/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/kokteyls/' + newKokteyl._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when kokteyl does not exist', function(done) {
      request(app)
        .delete('/api/kokteyls/' + newKokteyl._id)
        .expect(404)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
