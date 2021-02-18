/*
 * Copyright 2019 Lightbend Inc.
 */

const util = require("util");
const Long = require("long");

/**
 * @classdesc A Grow-only counter CRDT.
 *
 * As the name suggests, a grow only counter can be incremented, but not decremented.
 *
 * The value is stored as a 64-bit unsigned long, hence values over `2^64` can't be represented.
 *
 * @constructor module:akkaserverless.crdt.GCounter
 * @implements module:akkaserverless.crdt.CrdtState
 */
function GCounter() {
  let currentValue = Long.UZERO;
  let delta = Long.UZERO;

  /**
   * The value as a long.
   *
   * @name module:akkaserverless.crdt.GCounter#longValue
   * @type {Long}
   * @readonly
   */
  Object.defineProperty(this, "longValue", {
    get: function () {
      return currentValue;
    }
  });

  /**
   * The value as a number. Note that once the value exceeds `2^53`, this will not be an accurate
   * representation of the value. If you expect it to exceed `2^53`, {@link module:akkaserverless.crdt.GCounter#longValue} should be
   * used instead.
   *
   * @name module:akkaserverless.crdt.GCounter#value
   * @type {number}
   * @readonly
   */
  Object.defineProperty(this, "value", {
    get: function () {
      return currentValue.toNumber();
    }
  });

  /**
   * Increment the counter by the given number.
   *
   * @function module:akkaserverless.crdt.GCounter#increment
   * @param {Long|number} increment The amount to increment the counter by.
   * @returns {module:akkaserverless.crdt.GCounter} This counter.
   * @throws If the increment is less than zero.
   */
  this.increment = function (increment) {
    if (Long.ZERO.comp(increment) === 1) {
      throw new Error("Cannot decrement a GCounter");
    }
    currentValue = currentValue.add(increment);
    delta = delta.add(increment);
    return this;
  };

  this.getAndResetDelta = function (initial) {
    if (delta.greaterThan(0) || initial) {
      const crdtDelta = {
        gcounter: {
          increment: delta
        }
      };
      delta = Long.UZERO;
      return crdtDelta;
    } else {
      return null;
    }
  };

  this.applyDelta = function (delta) {
    if (!delta.gcounter) {
      throw new Error(util.format("Cannot apply delta %o to GCounter", delta));
    }
    currentValue = currentValue.add(delta.gcounter.increment);
  };

  this.toString = function () {
    return "GCounter(" + currentValue + ")";
  };
}

module.exports = GCounter;
