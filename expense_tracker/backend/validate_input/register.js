const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  console.log(data.username);
  data.username = !isEmpty(data.username) ? data.username : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.monthly_budget = !isEmpty(data.monthly_budget) ? data.monthly_budget : "";

  if (Validator.isEmpty(data.username)) {
    errors.name = "username field is required";
  }
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } 
  else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  if (!Validator.isNumeric(data.monthly_budget)) {
    errors.monthly_budget = "Monthly budget should be a number";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};