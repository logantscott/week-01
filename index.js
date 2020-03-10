const { castToNumber } = require('./lib/types.js');
const { Validator } = require('./lib/Validator.js');

const nameSchema = {
  type: String
};

const ageSchema = {
  type: Number,
  required: true
};

const weightSchema = {
  type: String
};

const obj = {
  name: 'spot',
  age: 7,
  weight: [20]
};

const nameValidator = new Validator('name', nameSchema);
const ageValidator = new Validator('age', ageSchema);
const weightValidator = new Validator('weight', weightSchema);

// console.log(nameValidator);

console.log(weightValidator.validate(obj));
