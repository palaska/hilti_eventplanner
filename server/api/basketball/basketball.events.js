/**
 * Basketball model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Basketball = require('./basketball.model');
var BasketballEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BasketballEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Basketball.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BasketballEvents.emit(event + ':' + doc._id, doc);
    BasketballEvents.emit(event, doc);
  }
}

module.exports = BasketballEvents;
