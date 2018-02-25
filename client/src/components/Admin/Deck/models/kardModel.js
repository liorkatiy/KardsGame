import model from "../../../../util/Model/model";

export default model({
  _id: {
    value: ""
  },
  q: {
    value: "",
    validators: {
      required: (v) => v ? undefined : "q is required",
    },
    placeholder: "Question"
  },
  a: {
    value: "",
    validators: {
      required: (v) => v ? undefined : "a is required",
    },
    placeholder: "Answer"
  },
  h: {
    value: "",
    validators: {
      required: (v) => v ? undefined : "h is required"
    },
    placeholder: "Help"
  }
});