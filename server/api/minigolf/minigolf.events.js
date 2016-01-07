/**
 * Minigolf model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Minigolf = require('./minigolf.model');
var MinigolfEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
MinigolfEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Minigolf.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    MinigolfEvents.emit(event + ':' + doc._id, doc);
    MinigolfEvents.emit(event, doc);
  }
}

module.exports = MinigolfEvents;
