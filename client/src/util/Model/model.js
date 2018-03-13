import {
  setInput,
  setProps,
  setMap, setValidators
} from "./schemaData";

import proTo from "./proto";


//schema[key]{value,validators,onChange,input,noInput}
function modelSchema(schema) {
  const {
    proto,
    inputs
  } = proTo(schema);

  setSchema(schema, proto, inputs, "");

  return (o) => model(o, schema, proto);
}

function setSchema(schema, proto, inputs, path) {
  if (path)
    path = path + ".";
  for (const key in schema) {
    if (schema[key].value == null) {
      proto[key] = {};
      setSchema(schema[key], proto[key], inputs, path + key);
      continue;
    }
    schema[key].schemaName = path + key;
    schema.shouldProto = true;
    schema[key].input = Array.isArray(schema[key].value) ?
      schema[key].value.length : 1;

    setProps(proto, key, schema[key].schemaName);
    setValidators(schema[key]);

    if (!schema[key].noInput) {
      setInput(schema[key], inputs);
    }
  }
}

/**
 * 
 * @param {*} o 
 * @param {*} schema 
 * @param {*} proto 
 * @returns {{display:(name)=>void,isValid:()=>boolean,inputs:(prop:string,validator:(error:string)=>void)=>(inputs)=>void,getModel:()=>{},clear:()=>void}}
 */
function model(o, schema, proto) {
  const privates = {};
  const res = Object.create(proto, {});
  setInstance(schema, privates, proto, res, res, o);
  setMap(res, privates);
  return res;
}

function setInstance(schema, privates, proto, result, parentRes, obj) {
  if (schema.shouldProto) {
    result._p = parentRes;
  }

  for (const key in proto) {
    if (schema[key].value == null) {
      result[key] = schema[key].shouldProto ? Object.create(proto[key], {}) : {};
      setInstance(schema[key], privates, proto[key], result[key], parentRes, obj[key]);
      continue;
    }
    if (!obj || (schema[key].default != null && obj[key] == null)) {
      privates[schema[key].schemaName] = setPrivateProp(schema[key].default);
    } else {
      privates[schema[key].schemaName] = setPrivateProp(obj[key]);
    }
  }
}

const setPrivateProp = (value) => {
  return {
    validate: false,
    isDisplayed: false,
    input: 0,
    onChange: [],
    _value: value,
    set value(val) {
      if (this.onChange.length) {
        this.onChange.forEach(func => func(val));
      }
      this._value = val;
    },
    get value() {
      return this._value;
    }
  };
};

export default modelSchema;