import {
  getMap
} from "./schemaData";
import React from "react";

const protoBase = {};

Object.defineProperty(protoBase, "clear", {
  value: function () {
    clear(this);
  },
  enumerable: false
});

Object.defineProperty(protoBase, "getModel", {
  value: function () {
    return getModel(this);
  },
  enumerable: false
});

const clear = (obj) => {
  for (const key in obj) {
    if (key === "_p") {
      continue;
    }
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      clear(obj[key]);
    } else {
      obj[key] = Array.isArray(obj[key]) ? [] : "";
    }
  }
};

const getModel = (obj) => {
  const result = {};
  for (const key in obj) {
    if (key === "_p") {
      continue;
    }
    if (typeof obj[key] === "object" && !Array.isArray(obj[key])) {
      result[key] = getModel(obj[key]);
    } else {
      result[key] = obj[key];
    }
  }
  return result;
};

export default () => {
  const proto = Object.create(protoBase);
  const inputs = {};
  Object.defineProperty(proto, "inputs", {
    get: function () {
      return ((name, func) => {
        return inputs[name].call(this, func);
      });
    },
    enumerable: false
  });

  Object.defineProperty(proto, "display", {
    value: function (name) {
      const pr = getMap(this)[name];
      return <span ref={(i) => {
        pr.display = i;
        if (pr.display)
          pr.display.innerHTML = pr.value;
        if (!pr.isDisplayed) {
          pr.isDisplayed = true;
          pr.onChange.push(val => pr.display ? pr.display.innerHTML = val : null);
        }
      }}  ></span>;
    },
    enumerable: false
  });

  Object.defineProperty(proto, "isValid", {
    value: function () {
      const privates = getMap(this);
      let valid = true;
      for (const key in privates) {
        if (privates[key].validate) {
          valid = privates[key].validate() && valid;
        }
      }
      return valid;
    },
    enumerable: false
  });
  return {
    proto,
    inputs
  };
};