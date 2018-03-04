import model from "../../../../util/Model/model";

export default model({
  _id: {
    value: ""
  },
  q: {
    value: "",
    validators: {
      required: true,
    },
    placeholder: "Question"
  },
  q1: {
    value: "",
    validators: {
      required: true,
    },
    placeholder: "Question 1"
  },
  q2: {
    value: "",
    validators: {
      required: true
    },
    placeholder: "Question 2"
  },
  q3: {
    value: "",
    validators: {
      required: true
    },
    placeholder: "Question 3"
  },
  q4: {
    value: "",
    validators: {
      required: true
    },
    placeholder: "Question 4"
  },

  a: {
    type: "radio",
    value: ["q1", "q2", "q3", "q4"],
    validators: {
      required: true,
    }
  }
});