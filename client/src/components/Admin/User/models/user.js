import model from "../../../../util/Model/model";

export const localUser = model({
  _id: {
    value: "",
    noInput: true
  },
  name: {
    value: "",
    alias: "User Name",
    onInput: true,
    validators: {
      required: true,
      max: 11,
      min: 2
    }
  },
  userData: {
    localUserID: {
      _id: {
        value: "",
        noInput: true
      },
      userName: {
        value: "",
        default: "",
        validators: {
          max: 11,
          min: 2
        }
      },
      password: {
        value: "",
        default: "",
        validators: {
          optional: true,
          max: 15,
          min: 5
        }
      },
      premission: {
        value: "0",
        validators: {
          required: (v) => {
            return v.toString() ? undefined : "permission is required";
          }
        }
      }
    }
  }
});

export const googleUser = model({
  _id: {
    value: "",
    noInput: true
  },
  name: {
    value: "",
    alias: "User Name",
    onInput: true,
    validators: {
      required: true,
      max: 11,
      min: 2
    }
  },
  userData: {
    googleID: {
      value: "",
      noInput: true
    }
  }
});

export const facebookUser = model({
  _id: {
    value: "",
    noInput: true
  },
  name: {
    value: "",
    alias: "User Name",
    onInput: true,
    validators: {
      required: true,
      max: 11,
      min: 2
    }
  },
  userData: {
    facebookID: {
      value: "",
      noInput: true
    }
  }
});
