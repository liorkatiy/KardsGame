import setResult from "./arrayToRecursion";
import validate from "./validation";

const initInput = (schema) => {
  const t = [];

  t.push(setInputValue(schema));

  if (schema.type === "radio") {
    t.push(setInputRadio);
  }

  t.push(setInputBinding(schema));

  if (schema.placeholder) {
    t.push(setInputPlaceHolder(schema));
  }

  if (schema.class) {
    t.push(setInputClass(schema));
  }

  if (schema.validators) {
    t.push(setInputValidator(schema));
  }

  t.push(setInputDefault(schema));

  const res = setResult(t, t.pop());
  return res;
};

const setInputValue = (schema) => {
  if (schema.input > 1) {
    if (schema.type === "radio") {
      return (input, privates) => {
        input.value = schema.value[privates.input];
        privates.onChange.push((v) => {
          input.checked = input.value === v;
        });
      };
    } else if (schema.type === "checkbox") {
      return (input, privates) => {
        input.value = schema.value[privates.input];
        privates.onChange.push((v) => {
          input.checked = v.indexOf(input.value) !== -1;
        });
      };
    }
  } else {
    return (input, privates) => {
      input.value = privates.value;
      privates.onChange.push((v) => input.value = v);
    };
  }
};

const setInputRadio = (input, privates) => {
  input.checked = input.value === privates.value;
};

const setInputBinding = (schema) => {
  if (schema.type === "checkbox") {
    return (input, privates) => {
      input.checked = privates.value.indexOf(input.value) !== -1;
      input.addEventListener("change", (e) => {
        const inp = e.target;
        if (inp.checked) {
          privates.value.push(inp.value);
        } else {
          privates.value = privates.value.filter((v) => v !== inp.value);
        }
      }, false);
    };
  } else {
    return (input, privates) => {
      input.addEventListener(isOnInput(schema.onInput),
        (e) => {
          privates.value = e.target.value;
        }, false);
    };
  }
};

const setInputPlaceHolder = (schema) => {
  return (input) => {
    input.placeholder = schema.placeholder;
  };
};

const setInputClass = (schema) => {
  return (input) => {
    input.class = schema.class;
  };
};

const setInputValidator = (schema) => {
  return (input, privates, err) => {
    if (!privates.validate) {
      privates.validate = () => {
        const result = validate(privates.value, schema.validators);
        err(result);
        return result == null;
      };
    }
    input.addEventListener(isOnInput(schema.onInput), privates.validate);
  };
};

const setInputDefault = (schema) => {
  return (input, privates) => {
    input.name = schema.name;
    privates.input++;
    if (schema.type)
      input.type = schema.type;
  };
};

const isOnInput = (onInput) => onInput ? "input" : "change";

export default initInput;