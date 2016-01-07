/**
 * Boccia model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Boccia = require('./boccia.model');
var BocciaEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BocciaEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Boccia.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BocciaEvents.emit(event + ':' + doc._id, doc);
    BocciaEvents.emit(event, doc);
  }
}

module.exports = BocciaEvents;
