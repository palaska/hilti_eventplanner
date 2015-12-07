'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var tennisCtrlStub = {
  index: 'tennisCtrl.index',
  show: 'tennisCtrl.show',
  create: 'tennisCtrl.create',
  update: 'tennisCtrl.update',
  destroy: 'tennisCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var tennisIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './tennis.controller': tennisCtrlStub
});

describe('Tennis API Router:', function() {

  it('should return an express router instance', function() {
    tennisIndex.should.equal(routerStub);
  });

  describe('GET /api/tenniss', function() {

    it('should route to tennis.controller.index', function() {
      routerStub.get
        .withArgs('/', 'tennisCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/tenniss/:id', function() {

    it('should route to tennis.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'tennisCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/tenniss', function() {

    it('should route to tennis.controller.create', function() {
      routerStub.post
        .withArgs('/', 'tennisCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/tenniss/:id', function() {

    it('should route to tennis.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'tennisCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/tenniss/:id', function() {

    it('should route to tennis.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'tennisCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/tenniss/:id', function() {

    it('should route to tennis.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'tennisCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
