'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var yemekCtrlStub = {
  index: 'yemekCtrl.index',
  show: 'yemekCtrl.show',
  create: 'yemekCtrl.create',
  update: 'yemekCtrl.update',
  destroy: 'yemekCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var yemekIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './yemek.controller': yemekCtrlStub
});

describe('Yemek API Router:', function() {

  it('should return an express router instance', function() {
    yemekIndex.should.equal(routerStub);
  });

  describe('GET /api/yemeks', function() {

    it('should route to yemek.controller.index', function() {
      routerStub.get
        .withArgs('/', 'yemekCtrl.index')
        .should.have.been.calledOnce;
    });

  });

  describe('GET /api/yemeks/:id', function() {

    it('should route to yemek.controller.show', function() {
      routerStub.get
        .withArgs('/:id', 'yemekCtrl.show')
        .should.have.been.calledOnce;
    });

  });

  describe('POST /api/yemeks', function() {

    it('should route to yemek.controller.create', function() {
      routerStub.post
        .withArgs('/', 'yemekCtrl.create')
        .should.have.been.calledOnce;
    });

  });

  describe('PUT /api/yemeks/:id', function() {

    it('should route to yemek.controller.update', function() {
      routerStub.put
        .withArgs('/:id', 'yemekCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('PATCH /api/yemeks/:id', function() {

    it('should route to yemek.controller.update', function() {
      routerStub.patch
        .withArgs('/:id', 'yemekCtrl.update')
        .should.have.been.calledOnce;
    });

  });

  describe('DELETE /api/yemeks/:id', function() {

    it('should route to yemek.controller.destroy', function() {
      routerStub.delete
        .withArgs('/:id', 'yemekCtrl.destroy')
        .should.have.been.calledOnce;
    });

  });

});
