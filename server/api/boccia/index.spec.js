'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var bocciaCtrlStub = {
  index: 'bocciaCtrl.index',
  show: 'bocciaCtrl.show',
  create: 'bocciaCtrl.create',
  update: 'bocciaCtrl.update',
  destroy: 'bocciaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var bocciaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './boccia.controller': bocciaCtrlStub
});

describe('Boccia API Router:', function() {

  it('should return an express router instance', function() {
    bocciaIndex.should.equal(routerStub);
  });

  describe('GET /api/boccias', function() {

    it('should route to boccia.controller.index', function() {
      routerStub.get
        .withArgs('/', 'bocciaCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/boccias/:id', function() {

    it('should route to boccia.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'bocciaCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/boccias', function() {

    it('should route to boccia.controller.create', function() {
      routerStub.post
        .withArgs('/', 'bocciaCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/boccias/:id', function() {

    it('should route to boccia.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'bocciaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/boccias/:id', function() {

    it('should route to boccia.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'bocciaCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/boccias/:id', function() {

    it('should route to boccia.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'bocciaCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
