/**
 * Yemek model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Yemek = require('./yemek.model');
var YemekEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
YemekEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Yemek.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    YemekEvents.emit(event + ':' + doc._id, doc);
    YemekEvents.emit(event, doc);
  }
}

module.exports = YemekEvents;
