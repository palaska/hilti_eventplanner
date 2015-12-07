'use strict';

var app = require('../..');
var request = require('supertest');

var newYemek;

describe('Yemek API:', function() {

  describe('GET /api/yemeks', function() {
    var yemeks;

    beforeEach(function(done) {
      request(app)
        .get('/api/yemeks')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          yemeks = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      yemeks.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/yemeks', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/yemeks')
        .send({
          name: 'New Yemek',
          info: 'This is the brand new yemek!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newYemek = res.body;
          done();
        });
    });

    it('should respond with the newly created yemek', function() {
      newYemek.name.should.equal('New Yemek');
      newYemek.info.should.equal('This is the brand new yemek!!!');
    });

  });

  describe('GET /api/yemeks/:id', function() {
    var yemek;

    beforeEach(function(done) {
      request(app)
        .get('/api/yemeks/' + newYemek._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          yemek = res.body;
          done();
        });
    });

    afterEach(function() {
      yemek = {};
    });

    it('should respond with the requested yemek', function() {
      yemek.name.should.equal('New Yemek');
      yemek.info.should.equal('This is the brand new yemek!!!');
    });

  });

  describe('PUT /api/yemeks/:id', function() {
    var updatedYemek

    beforeEach(function(done) {
      request(app)
        .put('/api/yemeks/' + newYemek._id)
        .send({
          name: 'Updated Yemek',
          info: 'This is the updated yemek!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedYemek = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedYemek = {};
    });

    it('should respond with the updated yemek', function() {
      updatedYemek.name.should.equal('Updated Yemek');
      updatedYemek.info.should.equal('This is the updated yemek!!!');
    });

  });

  describe('DELETE /api/yemeks/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/yemeks/' + newYemek._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when yemek does not exist', function(done) {
      request(app)
        .delete('/api/yemeks/' + newYemek._id)
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
