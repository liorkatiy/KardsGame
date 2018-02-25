function setResult(arr, func) {
  if (!arr.length)
    return func;
  const c = arr.pop();
  const f = (obj, privates, propName) => {
    c(obj, privates, propName);
    func(obj, privates, propName);
  };
  return setResult(arr, f);
};

export default setResult;