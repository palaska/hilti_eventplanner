/**
 * Bowling model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Bowling = require('./bowling.model');
var BowlingEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BowlingEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Bowling.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BowlingEvents.emit(event + ':' + doc._id, doc);
    BowlingEvents.emit(event, doc);
  }
}

module.exports = BowlingEvents;
