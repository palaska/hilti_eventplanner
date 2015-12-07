'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bowlingCtrlStub = {
  index: 'bowlingCtrl.index',
  show: 'bowlingCtrl.show',
  create: 'bowlingCtrl.create',
  update: 'bowlingCtrl.update',
  destroy: 'bowlingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bowlingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './bowling.controller': bowlingCtrlStub
});

describe('Bowling API Router:', function() {

  it('should return an express router instance', function() {
    bowlingIndex.should.equal(routerStub);
  });

  describe('GET /api/bowlings', function() {

    it('should route to bowling.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bowlingCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/bowlings/:id', function() {

    it('should route to bowling.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bowlingCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/bowlings', function() {

    it('should route to bowling.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bowlingCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/bowlings/:id', function() {

    it('should route to bowling.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bowlingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/bowlings/:id', function() {

    it('should route to bowling.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bowlingCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/bowlings/:id', function() {

    it('should route to bowling.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bowlingCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
