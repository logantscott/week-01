const { castToNumber } = require('./lib/types.js');
const { Validator } = require('./lib/Validator.js');

const nameSchema = {
  type: String,
  required: true
};

const ageSchema = {
  type: Number,
  required: true
};

const weightSchema = {
  type: String,
  required: true
};

const obj = {
  age: 7,
  weight: '20 lbs'
};

const nameValidator = new Validator('name', nameSchema);
const ageValidator = new Validator('age', ageSchema);
const weightValidator = new Validator('weight', weightSchema);

// console.log(nameValidator);

console.log(nameValidator.validate(obj), ageValidator.validate(obj), weightValidator.validate(obj));
