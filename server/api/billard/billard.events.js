/**
 * Billard model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Billard = require('./billard.model');
var BillardEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
BillardEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Billard.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    BillardEvents.emit(event + ':' + doc._id, doc);
    BillardEvents.emit(event, doc);
  }
}

module.exports = BillardEvents;
