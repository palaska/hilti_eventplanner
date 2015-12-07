'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var billardCtrlStub = {
  index: 'billardCtrl.index',
  show: 'billardCtrl.show',
  create: 'billardCtrl.create',
  update: 'billardCtrl.update',
  destroy: 'billardCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var billardIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './billard.controller': billardCtrlStub
});

describe('Billard API Router:', function() {

  it('should return an express router instance', function() {
    billardIndex.should.equal(routerStub);
  });

  describe('GET /api/billards', function() {

    it('should route to billard.controller.index', function() {
      routerStub.get
        .withArgs('/', 'billardCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/billards/:id', function() {

    it('should route to billard.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'billardCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/billards', function() {

    it('should route to billard.controller.create', function() {
      routerStub.post
        .withArgs('/', 'billardCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/billards/:id', function() {

    it('should route to billard.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'billardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/billards/:id', function() {

    it('should route to billard.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'billardCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/billards/:id', function() {

    it('should route to billard.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'billardCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
