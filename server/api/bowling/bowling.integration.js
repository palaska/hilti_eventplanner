'use strict';

var app = require('../..');
var request = require('supertest');

var newBowling;

describe('Bowling API:', function() {

  describe('GET /api/bowlings', function() {
    var bowlings;

    beforeEach(function(done) {
      request(app)
        .get('/api/bowlings')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bowlings = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      bowlings.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/bowlings', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/bowlings')
        .send({
          name: 'New Bowling',
          info: 'This is the brand new bowling!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBowling = res.body;
          done();
        });
    });

    it('should respond with the newly created bowling', function() {
      newBowling.name.should.equal('New Bowling');
      newBowling.info.should.equal('This is the brand new bowling!!!');
    });

  });

  describe('GET /api/bowlings/:id', function() {
    var bowling;

    beforeEach(function(done) {
      request(app)
        .get('/api/bowlings/' + newBowling._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          bowling = res.body;
          done();
        });
    });

    afterEach(function() {
      bowling = {};
    });

    it('should respond with the requested bowling', function() {
      bowling.name.should.equal('New Bowling');
      bowling.info.should.equal('This is the brand new bowling!!!');
    });

  });

  describe('PUT /api/bowlings/:id', function() {
    var updatedBowling

    beforeEach(function(done) {
      request(app)
        .put('/api/bowlings/' + newBowling._id)
        .send({
          name: 'Updated Bowling',
          info: 'This is the updated bowling!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBowling = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBowling = {};
    });

    it('should respond with the updated bowling', function() {
      updatedBowling.name.should.equal('Updated Bowling');
      updatedBowling.info.should.equal('This is the updated bowling!!!');
    });

  });

  describe('DELETE /api/bowlings/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/bowlings/' + newBowling._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when bowling does not exist', function(done) {
      request(app)
        .delete('/api/bowlings/' + newBowling._id)
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
