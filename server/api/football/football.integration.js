'use strict';

var app = require('../..');
var request = require('supertest');

var newFootball;

describe('Football API:', function() {

  describe('GET /api/footballs', function() {
    var footballs;

    beforeEach(function(done) {
      request(app)
        .get('/api/footballs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          footballs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      footballs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/footballs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/footballs')
        .send({
          name: 'New Football',
          info: 'This is the brand new football!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newFootball = res.body;
          done();
        });
    });

    it('should respond with the newly created football', function() {
      newFootball.name.should.equal('New Football');
      newFootball.info.should.equal('This is the brand new football!!!');
    });

  });

  describe('GET /api/footballs/:id', function() {
    var football;

    beforeEach(function(done) {
      request(app)
        .get('/api/footballs/' + newFootball._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          football = res.body;
          done();
        });
    });

    afterEach(function() {
      football = {};
    });

    it('should respond with the requested football', function() {
      football.name.should.equal('New Football');
      football.info.should.equal('This is the brand new football!!!');
    });

  });

  describe('PUT /api/footballs/:id', function() {
    var updatedFootball

    beforeEach(function(done) {
      request(app)
        .put('/api/footballs/' + newFootball._id)
        .send({
          name: 'Updated Football',
          info: 'This is the updated football!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedFootball = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedFootball = {};
    });

    it('should respond with the updated football', function() {
      updatedFootball.name.should.equal('Updated Football');
      updatedFootball.info.should.equal('This is the updated football!!!');
    });

  });

  describe('DELETE /api/footballs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/footballs/' + newFootball._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when football does not exist', function(done) {
      request(app)
        .delete('/api/footballs/' + newFootball._id)
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
