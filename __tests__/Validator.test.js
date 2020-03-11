const {
  Validator
} = require('../lib/Validator.js');


describe('Validator', () => {
  let nameValidator;
  beforeEach(() => {
    nameValidator = new Validator('name', {
      type: String,
      required: true
    });
  });

  it('has a field and configuration property', () => {
    expect(nameValidator.fieldName).toEqual('name');
    expect(nameValidator.configuration).toEqual({
      type: String,
      required: true
    });
  });

  it('validates a valid object', () => {
    const dog = {
      name: 'spot',
      age: 5,
      weight: '20 lbs'
    };

    expect(nameValidator.validate(dog)).toEqual('spot');
  });

  it('validates a valid object with types that can cast', () => {
    const dog = {
      name: 7,
      age: 5,
      weight: '20 lbs'
    };

    expect(nameValidator.validate(dog)).toEqual('7');
  });

  it('throws an error with an invalid data type that can not cast', () => {
    const dog = {
      name: {},
      age: 5,
      weight: '20 lbs'
    };

    expect(() => nameValidator.validate(dog)).toThrowError();
  });

  it('throws an error if required field is missing', () => {
    const dog = {
      age: 5,
      weight: '20 lbs'
    };

    expect(() => nameValidator.validate(dog)).toThrowError();
  });  
  it('throws an error if required field is missing', () => {
    const nameValidator = new Validator('name', {
      type: String,
      required: false
    });
    
    const dog = {
      age: 5,
      weight: '20 lbs'
    };

    expect(nameValidator.validate(dog)).toEqual(undefined);
  });  
});
