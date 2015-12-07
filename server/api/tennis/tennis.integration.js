'use strict';

var app = require('../..');
var request = require('supertest');

var newTennis;

describe('Tennis API:', function() {

  describe('GET /api/tenniss', function() {
    var tenniss;

    beforeEach(function(done) {
      request(app)
        .get('/api/tenniss')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          tenniss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      tenniss.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/tenniss', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/tenniss')
        .send({
          name: 'New Tennis',
          info: 'This is the brand new tennis!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newTennis = res.body;
          done();
        });
    });

    it('should respond with the newly created tennis', function() {
      newTennis.name.should.equal('New Tennis');
      newTennis.info.should.equal('This is the brand new tennis!!!');
    });

  });

  describe('GET /api/tenniss/:id', function() {
    var tennis;

    beforeEach(function(done) {
      request(app)
        .get('/api/tenniss/' + newTennis._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          tennis = res.body;
          done();
        });
    });

    afterEach(function() {
      tennis = {};
    });

    it('should respond with the requested tennis', function() {
      tennis.name.should.equal('New Tennis');
      tennis.info.should.equal('This is the brand new tennis!!!');
    });

  });

  describe('PUT /api/tenniss/:id', function() {
    var updatedTennis

    beforeEach(function(done) {
      request(app)
        .put('/api/tenniss/' + newTennis._id)
        .send({
          name: 'Updated Tennis',
          info: 'This is the updated tennis!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedTennis = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedTennis = {};
    });

    it('should respond with the updated tennis', function() {
      updatedTennis.name.should.equal('Updated Tennis');
      updatedTennis.info.should.equal('This is the updated tennis!!!');
    });

  });

  describe('DELETE /api/tenniss/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/tenniss/' + newTennis._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when tennis does not exist', function(done) {
      request(app)
        .delete('/api/tenniss/' + newTennis._id)
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
