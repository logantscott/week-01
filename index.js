const { castToNumber } = require('./lib/types.js');
const { Validator } = require('./lib/Validator.js');
const { Schema } = require('./lib/Schema.js');

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

// console.log(weightValidator.validate(obj));

const schema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  weight: {
    type: String
  }
});

// const validators = Object.entries(schema)
//   .map(([field, configuration]) => new Validator(field, configuration));

const spot = {
  name: 'spot',
  age: 5,
  weight: '20 lbs'
};

const rover = {
  name: 'rover',
  age: '10'
};

const who = {
  age: 'hi'
};

console.log(schema);

console.log(schema.validate(spot)); // returns { name: 'spot', age: 5, weight: '20 lbs' }
console.log(schema.validate(rover)); // returns { name: 'rover', age: 10 };'
// console.log(schema.validate(who)); // throws a errors about name being required and age not being a number

// const validated = {};
// validators.forEach(validator => {
//   validated[validator.field] = validator.validate(dog);
// });
// console.log(validated);
