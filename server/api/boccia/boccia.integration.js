'use strict';

var app = require('../..');
var request = require('supertest');

var newBoccia;

describe('Boccia API:', function() {

  describe('GET /api/boccias', function() {
    var boccias;

    beforeEach(function(done) {
      request(app)
        .get('/api/boccias')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          boccias = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      boccias.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/boccias', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/boccias')
        .send({
          name: 'New Boccia',
          info: 'This is the brand new boccia!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBoccia = res.body;
          done();
        });
    });

    it('should respond with the newly created boccia', function() {
      newBoccia.name.should.equal('New Boccia');
      newBoccia.info.should.equal('This is the brand new boccia!!!');
    });

  });

  describe('GET /api/boccias/:id', function() {
    var boccia;

    beforeEach(function(done) {
      request(app)
        .get('/api/boccias/' + newBoccia._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          boccia = res.body;
          done();
        });
    });

    afterEach(function() {
      boccia = {};
    });

    it('should respond with the requested boccia', function() {
      boccia.name.should.equal('New Boccia');
      boccia.info.should.equal('This is the brand new boccia!!!');
    });

  });

  describe('PUT /api/boccias/:id', function() {
    var updatedBoccia

    beforeEach(function(done) {
      request(app)
        .put('/api/boccias/' + newBoccia._id)
        .send({
          name: 'Updated Boccia',
          info: 'This is the updated boccia!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBoccia = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBoccia = {};
    });

    it('should respond with the updated boccia', function() {
      updatedBoccia.name.should.equal('Updated Boccia');
      updatedBoccia.info.should.equal('This is the updated boccia!!!');
    });

  });

  describe('DELETE /api/boccias/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/boccias/' + newBoccia._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when boccia does not exist', function(done) {
      request(app)
        .delete('/api/boccias/' + newBoccia._id)
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
