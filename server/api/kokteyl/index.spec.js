'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var kokteylCtrlStub = {
  index: 'kokteylCtrl.index',
  show: 'kokteylCtrl.show',
  create: 'kokteylCtrl.create',
  update: 'kokteylCtrl.update',
  destroy: 'kokteylCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var kokteylIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './kokteyl.controller': kokteylCtrlStub
});

describe('Kokteyl API Router:', function() {

  it('should return an express router instance', function() {
    kokteylIndex.should.equal(routerStub);
  });

  describe('GET /api/kokteyls', function() {

    it('should route to kokteyl.controller.index', function() {
      routerStub.get
        .withArgs('/', 'kokteylCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/kokteyls/:id', function() {

    it('should route to kokteyl.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'kokteylCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/kokteyls', function() {

    it('should route to kokteyl.controller.create', function() {
      routerStub.post
        .withArgs('/', 'kokteylCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/kokteyls/:id', function() {

    it('should route to kokteyl.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'kokteylCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/kokteyls/:id', function() {

    it('should route to kokteyl.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'kokteylCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/kokteyls/:id', function() {

    it('should route to kokteyl.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'kokteylCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
