'use strict';

var app = require('../..');
var request = require('supertest');

var newBillard;

describe('Billard API:', function() {

  describe('GET /api/billards', function() {
    var billards;

    beforeEach(function(done) {
      request(app)
        .get('/api/billards')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          billards = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      billards.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/billards', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/billards')
        .send({
          name: 'New Billard',
          info: 'This is the brand new billard!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          newBillard = res.body;
          done();
        });
    });

    it('should respond with the newly created billard', function() {
      newBillard.name.should.equal('New Billard');
      newBillard.info.should.equal('This is the brand new billard!!!');
    });

  });

  describe('GET /api/billards/:id', function() {
    var billard;

    beforeEach(function(done) {
      request(app)
        .get('/api/billards/' + newBillard._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          billard = res.body;
          done();
        });
    });

    afterEach(function() {
      billard = {};
    });

    it('should respond with the requested billard', function() {
      billard.name.should.equal('New Billard');
      billard.info.should.equal('This is the brand new billard!!!');
    });

  });

  describe('PUT /api/billards/:id', function() {
    var updatedBillard

    beforeEach(function(done) {
      request(app)
        .put('/api/billards/' + newBillard._id)
        .send({
          name: 'Updated Billard',
          info: 'This is the updated billard!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedBillard = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBillard = {};
    });

    it('should respond with the updated billard', function() {
      updatedBillard.name.should.equal('Updated Billard');
      updatedBillard.info.should.equal('This is the updated billard!!!');
    });

  });

  describe('DELETE /api/billards/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/billards/' + newBillard._id)
        .expect(204)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when billard does not exist', function(done) {
      request(app)
        .delete('/api/billards/' + newBillard._id)
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
