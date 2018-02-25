import model from "../../../../util/Model/model";

export default model({
  name: {
    value: "",
    alias: "User Name",
    onInput: true,
    validators: {
      required: true,// (v) => v ? undefined : "name is required",
      max: 11,// v => v.length < 11 ? undefined : "should be max 10 chars",
      min: 2//v => v.length < 2 ? "should be at least 2 chars" : undefined
    }
  },
  password: {
    value: "",
    default: "",
    validators: {
      optional: true,
      max: 15,//v => v.length < 15 ? undefined : "should be max 15 chars",
      min: 5//v => v.length < 5 ? "should be at least 5 characters" : undefined
    }
  },
  premission: {
    value: "0",
    validators: {
      required: (v) => {
        return v.toString() ? undefined : "permission is required";
      }
    }
  },
  _id: {
    value: "",
    noInput: true
  }
});