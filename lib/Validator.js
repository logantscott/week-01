const { getCaster } = require('./types.js');

class Validator {
  constructor(fieldName, configuration) {
    this.fieldName = fieldName;
    this.configuration = configuration;
  }
  validate(obj){
    if(obj[this.fieldName]) {
      return getCaster(this.configuration.type)(obj[this.fieldName]);
    } else if(this.configuration.required) {
      throw new Error(`obj['${this.fieldName}'] - Required field missing!`);
    }
  }
}

module.exports = {
  Validator
};
