import initInput from "./inputData";

const map = new WeakMap();

export const setProps = (proto, propName, schemaName) => {
  Object.defineProperty(proto, propName, {
    enumerable: true,
    get: function () {
      return map.get(this._p)[schemaName].value;
    },
    set: function (val) {
      map.get(this._p)[schemaName].value = val;
    }
  });
};

export const setInput = (schema, inputs) => {
  const inputSettings = initInput(schema);
  Object.defineProperty(inputs, schema.schemaName, {
    value: function (validationFunction) {
      const p = map.get(this._p)[schema.schemaName];
      if (p.input < schema.input) {
        return (input => {
          if (input)
            inputSettings(input, p, validationFunction);
        });
      }
      else {
        return false;
      }
    }
  });
};

export const setValidators = (schema) => {
  if (schema.validators) {
    const name = schema.alias || schema.name;

    if (isNotFunc(schema.validators["required"])) {
      const msg = name + " Is Required";
      schema.validators["required"] = val => val ? undefined : msg;
    }

    if (isNotFunc(schema.validators["min"])) {
      const min = schema.validators["min"];

      if (schema.type === "date") {
        const msg = name + " Need To Be Greater Than " + min.toLocaleDateString();
        schema.validators["min"] = val => new Date(val) < min ? msg : undefined;
      }
      else if (schema.type === "number") {
        const msg = name + " Need To Be Greater Than " + min;
        schema.validators["min"] = val => parseInt(val, 10) < min ? msg : undefined;
      }
      else {
        const msg = name + " Need To Have More Charcters Than " + min;
        schema.validators["min"] = val => val.length < min ? msg : undefined;
      }
    }

    if (isNotFunc(schema.validators["max"])) {
      const max = schema.validators["max"];

      if (schema.type === "date") {
        const msg = name + " Need To Be Less Than " + max.toLocaleDateString();
        schema.validators["max"] = val => new Date(val) > max ? msg : undefined;
      }
      else if (schema.type === "number") {
        const msg = name + " Need To Be Less Than " + max;
        schema.validators["max"] = val => parseInt(val, 10) > max ? msg : undefined;
      }
      else {
        const msg = name + " Need To Have Less Charcters Than " + max;
        schema.validators["max"] = val => val.length > max ? msg : undefined;
      }
    }
    if (isNotFunc(schema.validators["isEmail"])) {
      if (schema.type === "email") {
        const msg = name + " Is Not Valid Email";
        schema.validators["isEmail"] = val =>
          /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            .test(val) ? undefined : msg;
      }
    }

    if (isNotFunc(schema.validators["regex"])) {
      const regex = schema.validators["regex"];
      const msg = name + " Is Not Valid";
      schema.validators["regex"] = val =>
        new RegExp(regex).test(val) ? undefined : msg;
    }
  }
};

const isNotFunc = (val) => typeof val !== "function" && val != null;

export const setMap = (obj, privates) => {
  map.set(obj, privates);
};

export const getMap = (obj) => map.get(obj);