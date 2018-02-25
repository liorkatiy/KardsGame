const validator = require('validator');
/**
 * 
 * @param {string} s 
 */
const custom = (s) => { };

const validatorParams = {
  isMongoID: true,
  length: { min: 0, max: 0 },
  isNumeric: true,
  isDate: true,
  custom
};

/**
 * 
 * @param {string} type
 * @param {string} name 
 * @param {validatorParams} validation
 */
const getData = (name, validation) => {
  const p = name.split(".");
  const validate = validation ?
    setValidation(validation) :
    () => true;
  return (optional) => (req, res, next) => {
    const data = getDataFromRequest(req, p);
    if (data === undefined) {
      if (optional) {
        next();
      }
      else {
        res.sendError();
      }
    } else if (validate(data)) {
      next();
    }
    else {
      res.sendError();
    }
  };
};

function setValidation(validation) {
  const result = [];

  if (validation.length) {
    const min = validation.length.min;
    const max = validation.length.max;
    result.push((s) => validator.isLength(s, { min, max }));
  }

  if (validation.isMongoID) {
    result.push((s) => validator.isMongoId(s));
  }

  if (validation.isNumeric) {
    result.push((s) => validator.isNumeric(s));
  }

  if (validation.isDate) {
    result.push((s) => validator.toDate(s));
  }

  if (validation.isString) {
    result.push((s) => typeof s === "string");
  }

  if (validation.custom) {
    const func = validation.custom;
    result.push(func);
  }
  return validationReturn(result);
}

function validationReturn(result) {
  return (s) => {
    s = s.toString();
    for (let i = 0; i < result.length; i++) {
      if (!result[i](s)) {
        return false;
      }
    }
    return true;
  };
}

function getDataFromRequest(req, name) {
  let body = req.body;
  let query = req.query;
  for (let i = 0; i < name.length; i++) {
    body = getNextValue(body, name[i]);
    query = getNextValue(query, name[i]);
    if (body === undefined && query === undefined) {
      return undefined;
    }
  }
  return body !== undefined ? body : query;
}

function getNextValue(obj, param) {
  return obj !== undefined ? obj[param] : undefined;
}

module.exports = getData;