const { Validator } = require('./Validator.js');

class Schema {
  constructor(schemaDefinition) {
    const validators = Object.entries(schemaDefinition);
    this.validators = validators.map(([fieldName, configuration]) => new Validator(fieldName, configuration));
  }

  validate(obj){
    const validated = {};
    const errors = [];
    this.validators.forEach(validator => {
      if(validator.fieldName in obj || validator.configuration.required) {
        try {
          validated[validator.fieldName] = validator.validate(obj);
        } catch(e) {
          errors.push(e);
        }
      } 
    });
    if(errors.length > 0) {
      throw new Error(`invalid schema >> ${errors}`);
    }
    return validated;
  }
}

module.exports = {
  Schema
};
