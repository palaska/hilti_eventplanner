/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/kokteyls              ->  index
 * POST    /api/kokteyls              ->  create
 * GET     /api/kokteyls/:id          ->  show
 * PUT     /api/kokteyls/:id          ->  update
 * DELETE  /api/kokteyls/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Kokteyl = require('./kokteyl.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Kokteyls
exports.index = function(req, res) {
  Kokteyl.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Kokteyl from the DB
exports.show = function(req, res) {
  Kokteyl.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Kokteyl in the DB
exports.create = function(req, res) {
  Kokteyl.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Kokteyl in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Kokteyl.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Kokteyl from the DB
exports.destroy = function(req, res) {
  Kokteyl.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
