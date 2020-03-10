const { getCaster } = require('./types.js');

class Validator {
  constructor(fieldName, configuration) {
    this.fieldName = fieldName;
    this.configuration = configuration;
  }
  validate(obj){
    if(obj[this.fieldName]) {
      try {
        return getCaster(this.configuration.type)(obj[this.fieldName]);
      } catch(err) {
        return new Error(`obj['${this.fieldName}'] - Invalid data type!`);
      }
    } else if(this.configuration.required) {
      throw new Error(`obj['${this.fieldName}'] - Required field missing!`);
    }
  }
}

module.exports = {
  Validator
};
