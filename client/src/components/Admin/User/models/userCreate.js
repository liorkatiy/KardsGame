import model from "../../../../util/Model/model";

export default model({
  name: {
    type: "text",
    alias: "User Name",
    onInput: true,
    value: "",
    default: "",
    validators: {
      required: true,
      min: 2,
      max: 11

    },
    placeholder: "name"
  },
  password: {
    onInput: true,
    alias: "Password",
    type: "password",
    value: "",
    default: "",
    placeholder: "password",
    validators: {
      required: true,
      max: 15,
      min: 5
    }
  }
});