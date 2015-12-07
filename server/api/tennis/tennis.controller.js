/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/tenniss              ->  index
 * POST    /api/tenniss              ->  create
 * GET     /api/tenniss/:id          ->  show
 * PUT     /api/tenniss/:id          ->  update
 * DELETE  /api/tenniss/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Tennis = require('./tennis.model');

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

// Gets a list of Tenniss
exports.index = function(req, res) {
  Tennis.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Tennis from the DB
exports.show = function(req, res) {
  Tennis.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Tennis in the DB
exports.create = function(req, res) {
  Tennis.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Tennis in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Tennis.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Tennis from the DB
exports.destroy = function(req, res) {
  Tennis.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
