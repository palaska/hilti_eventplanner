/**
 * Football model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Football = require('./football.model');
var FootballEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
FootballEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Football.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    FootballEvents.emit(event + ':' + doc._id, doc);
    FootballEvents.emit(event, doc);
  }
}

module.exports = FootballEvents;
