/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/boccias              ->  index
 * POST    /api/boccias              ->  create
 * GET     /api/boccias/:id          ->  show
 * PUT     /api/boccias/:id          ->  update
 * DELETE  /api/boccias/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Boccia = require('./boccia.model');

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

// Gets a list of Boccias
exports.index = function(req, res) {
  Boccia.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Boccia from the DB
exports.show = function(req, res) {
  Boccia.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Boccia in the DB
exports.create = function(req, res) {
  Boccia.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Boccia in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Boccia.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Boccia from the DB
exports.destroy = function(req, res) {
  Boccia.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
