const { getCaster } = require('./types.js');

class Validator {
  constructor(fieldName, configuration) {
    this.fieldName = fieldName;
    this.configuration = configuration;
  }
  validate(obj){
    if(this.configuration.required && obj[this.fieldName]){ 
      return getCaster(this.configuration.type)(obj[this.fieldName]);
    } else {
      throw new Error('error');
    }
    // return this.configuration.required && getCaster(this.configuration.type)(obj[this.fieldName]);
  }
}

module.exports = {
  Validator
};
