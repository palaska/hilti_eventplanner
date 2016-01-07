'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var footballCtrlStub = {
  index: 'footballCtrl.index',
  show: 'footballCtrl.show',
  create: 'footballCtrl.create',
  update: 'footballCtrl.update',
  destroy: 'footballCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var footballIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './football.controller': footballCtrlStub
});

describe('Football API Router:', function() {

  it('should return an express router instance', function() {
    footballIndex.should.equal(routerStub);
  });

  describe('GET /api/footballs', function() {

    it('should route to football.controller.index', function() {
      routerStub.get
        .withArgs('/', 'footballCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/footballs/:id', function() {

    it('should route to football.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'footballCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/footballs', function() {

    it('should route to football.controller.create', function() {
      routerStub.post
        .withArgs('/', 'footballCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/footballs/:id', function() {

    it('should route to football.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'footballCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/footballs/:id', function() {

    it('should route to football.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'footballCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/footballs/:id', function() {

    it('should route to football.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'footballCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
