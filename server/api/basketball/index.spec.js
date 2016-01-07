'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var basketballCtrlStub = {
  index: 'basketballCtrl.index',
  show: 'basketballCtrl.show',
  create: 'basketballCtrl.create',
  update: 'basketballCtrl.update',
  destroy: 'basketballCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var basketballIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './basketball.controller': basketballCtrlStub
});

describe('Basketball API Router:', function() {

  it('should return an express router instance', function() {
    basketballIndex.should.equal(routerStub);
  });

  describe('GET /api/basketballs', function() {

    it('should route to basketball.controller.index', function() {
      routerStub.get
        .withArgs('/', 'basketballCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/basketballs/:id', function() {

    it('should route to basketball.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'basketballCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/basketballs', function() {

    it('should route to basketball.controller.create', function() {
      routerStub.post
        .withArgs('/', 'basketballCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/basketballs/:id', function() {

    it('should route to basketball.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'basketballCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/basketballs/:id', function() {

    it('should route to basketball.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'basketballCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/basketballs/:id', function() {

    it('should route to basketball.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'basketballCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
