'use strict';

var app = require('../..');
var request = require('supertest');

var newBasketball;

describe('Basketball API:', function() {

  describe('GET /api/basketballs', function() {
    var basketballs;

    beforeEach(function(done) {
      request(app)
        .get('/api/basketballs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          basketballs = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      basketballs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/basketballs', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/basketballs')
        .send({
          name: 'New Basketball',
          info: 'This is the brand new basketball!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBasketball = res.body;
          done();
        });
    });

    it('should respond with the newly created basketball', function() {
      newBasketball.name.should.equal('New Basketball');
      newBasketball.info.should.equal('This is the brand new basketball!!!');
    });

  });

  describe('GET /api/basketballs/:id', function() {
    var basketball;

    beforeEach(function(done) {
      request(app)
        .get('/api/basketballs/' + newBasketball._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          basketball = res.body;
          done();
        });
    });

    afterEach(function() {
      basketball = {};
    });

    it('should respond with the requested basketball', function() {
      basketball.name.should.equal('New Basketball');
      basketball.info.should.equal('This is the brand new basketball!!!');
    });

  });

  describe('PUT /api/basketballs/:id', function() {
    var updatedBasketball

    beforeEach(function(done) {
      request(app)
        .put('/api/basketballs/' + newBasketball._id)
        .send({
          name: 'Updated Basketball',
          info: 'This is the updated basketball!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBasketball = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBasketball = {};
    });

    it('should respond with the updated basketball', function() {
      updatedBasketball.name.should.equal('Updated Basketball');
      updatedBasketball.info.should.equal('This is the updated basketball!!!');
    });

  });

  describe('DELETE /api/basketballs/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/basketballs/' + newBasketball._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when basketball does not exist', function(done) {
      request(app)
        .delete('/api/basketballs/' + newBasketball._id)
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
