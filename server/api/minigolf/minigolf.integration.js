'use strict';

var app = require('../..');
var request = require('supertest');

var newMinigolf;

describe('Minigolf API:', function() {

  describe('GET /api/minigolfs', function() {
    var minigolfs;

    beforeEach(function(done) {
      request(app)
        .get('/api/minigolfs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          minigolfs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      minigolfs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/minigolfs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/minigolfs')
        .send({
          name: 'New Minigolf',
          info: 'This is the brand new minigolf!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newMinigolf = res.body;
          done();
        });
    });

    it('should respond with the newly created minigolf', function() {
      newMinigolf.name.should.equal('New Minigolf');
      newMinigolf.info.should.equal('This is the brand new minigolf!!!');
    });

  });

  describe('GET /api/minigolfs/:id', function() {
    var minigolf;

    beforeEach(function(done) {
      request(app)
        .get('/api/minigolfs/' + newMinigolf._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          minigolf = res.body;
          done();
        });
    });

    afterEach(function() {
      minigolf = {};
    });

    it('should respond with the requested minigolf', function() {
      minigolf.name.should.equal('New Minigolf');
      minigolf.info.should.equal('This is the brand new minigolf!!!');
    });

  });

  describe('PUT /api/minigolfs/:id', function() {
    var updatedMinigolf

    beforeEach(function(done) {
      request(app)
        .put('/api/minigolfs/' + newMinigolf._id)
        .send({
          name: 'Updated Minigolf',
          info: 'This is the updated minigolf!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedMinigolf = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedMinigolf = {};
    });

    it('should respond with the updated minigolf', function() {
      updatedMinigolf.name.should.equal('Updated Minigolf');
      updatedMinigolf.info.should.equal('This is the updated minigolf!!!');
    });

  });

  describe('DELETE /api/minigolfs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/minigolfs/' + newMinigolf._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when minigolf does not exist', function(done) {
      request(app)
        .delete('/api/minigolfs/' + newMinigolf._id)
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
