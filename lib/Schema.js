const { Validator } = require('./Validator.js');

class Schema {
  constructor(schemaDefinition) {
    const validators = Object.entries(schemaDefinition);
    this.validators = validators.map(([fieldName, configuration]) => new Validator(fieldName, configuration));
  }

  validate(obj){
    const validated = {};
    this.validators.forEach(validator => {
      if(validator.fieldName in obj || validator.configuration.required) {
        validated[validator.fieldName] = validator.validate(obj);
      } 
    });
    return validated;
  }
}

module.exports = {
  Schema
};
