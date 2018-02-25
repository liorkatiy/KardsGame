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

  for (const key in schema) {
    schema[key].name = key;

    schema[key].input = Array.isArray(schema[key].value) ?
      schema[key].value.length : 1;

    setProps(proto, key);
    setValidators(schema[key]);

    if (!schema[key].noInput) {
      setInput(schema[key], inputs);
    }
  }

  return (o) => model(o, schema, proto);
}

/**
 * 
 * @param {*} o 
 * @param {*} schema 
 * @param {*} proto 
 * @returns {{isValid:()=>boolean,inputs:(prop:string,validator:(error:string)=>void)=>(inputs)=>void,getModel:()=>{},clear:()=>void}}
 */
function model(o, schema, proto) {
  const privates = {};
  for (const key in proto) {
    if (schema[key].default != null && o[key] == null) {
      privates[key] = setPrivateProp(schema[key].default);
    } else {
      privates[key] = setPrivateProp(o[key]);
    }
  }
  const res = Object.create(proto);
  setMap(res, privates);
  return res;
}

const setPrivateProp = (value) => {
  return {
    validate: false,
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