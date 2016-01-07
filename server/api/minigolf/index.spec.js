'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var minigolfCtrlStub = {
  index: 'minigolfCtrl.index',
  show: 'minigolfCtrl.show',
  create: 'minigolfCtrl.create',
  update: 'minigolfCtrl.update',
  destroy: 'minigolfCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var minigolfIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './minigolf.controller': minigolfCtrlStub
});

describe('Minigolf API Router:', function() {

  it('should return an express router instance', function() {
    minigolfIndex.should.equal(routerStub);
  });

  describe('GET /api/minigolfs', function() {

    it('should route to minigolf.controller.index', function() {
      routerStub.get
        .withArgs('/', 'minigolfCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/minigolfs/:id', function() {

    it('should route to minigolf.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'minigolfCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/minigolfs', function() {

    it('should route to minigolf.controller.create', function() {
      routerStub.post
        .withArgs('/', 'minigolfCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/minigolfs/:id', function() {

    it('should route to minigolf.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'minigolfCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/minigolfs/:id', function() {

    it('should route to minigolf.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'minigolfCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/minigolfs/:id', function() {

    it('should route to minigolf.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'minigolfCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
