/**
 * Kokteyl model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Kokteyl = require('./kokteyl.model');
var KokteylEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
KokteylEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Kokteyl.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    KokteylEvents.emit(event + ':' + doc._id, doc);
    KokteylEvents.emit(event, doc);
  }
}

module.exports = KokteylEvents;
