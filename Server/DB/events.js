const EventEmitter = require("events");
class Emitter extends EventEmitter {}

const emitter = new Emitter();

/**
 * 
 * @param {(kard,deckName:string)=>void} func 
 */
function onKardAdded(func) {
  emitter.on("kardAdded", func);
}

function kardAdded(kard, deckName) {
  emitter.emit("kardAdded", kard, deckName);
}

/**
 * 
 * @param {(kardID:string,deckName:string)=>void} func 
 */
function onKardRemoved(func) {
  emitter.on("kardRemoved", func);
}

function kardRemoved(kardID, deckName) {
  emitter.emit("kardRemoved", kardID, deckName);
}

/**
 * 
 * @param {(deckName:string)=>void} func 
 */
function onDeckRemoved(func) {
  emitter.on("deckRemoved", func);
}

function deckRemoved(deckName) {
  emitter.emit("deckRemoved", deckName);
}

module.exports = {
  onKardAdded,
  kardAdded,
  onDeckRemoved,
  deckRemoved,
  onKardRemoved,
  kardRemoved
};