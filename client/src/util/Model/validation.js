const validate = (value, validators) => {
  if (validators.optional && !value) {
    return null;
  }
  for (const key in validators) {
    if (key === "optional") {
      continue;
    }
    const res = validators[key](value);
    if (res != null) {
      return res;
    }
  }
  return null;
};

export default validate;