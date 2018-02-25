import model from "../../../../util/Model/model";

export default model({
  name: {
    type: "text",
    alias: "User Name",
    onInput: true,
    value: "",
    default: "",
    validators: {
      required: true,//(v) => v ? undefined : "name is required",
      min: 2, max: 11//v => v.length < 6 ? undefined : "should be max 6 chars"

    },
    placeholder: "name"
  },
  password: {
    onInput: true,
    alias: "Password",
    type: "text",
    value: "",
    default: "",
    placeholder: "password",
    validators: {
      required: true,// (v) => v ? undefined : "password is required",
      max: 15,//v => v.length < 6 ? undefined : "should be max 6 chars",
      min: 5//v => v.length < 4 ? "should be at least 4 characters" : undefined
    }
  }
});