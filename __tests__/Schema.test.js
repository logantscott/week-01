const {
  Schema
} = require('../lib/Schema.js');


describe('Schema', () => {
  let schema;
  beforeEach(() => {
    schema = new Schema({
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
  });

  it('casts all fields correctly', () => {
    const dog = {
      name: 13,
      age: '5',
      weight: 20
    };

    expect(schema.validate(dog)).toEqual({
      name: '13',
      age: 5,
      weight: '20'
    });
  });

  it('throws an error if an object value does not follow schema', () => {
    const dog = {
      name: { spot: 'spot' },
      age: 5,
      weight: '20 lbs'
    };

    expect(() => schema.validate(dog)).toThrowError();
  });

  it('throws an error if an object value missing', () => {
    const dog = {
      name: 'spot',
      weight: '20 lbs'
    };

    expect(() => schema.validate(dog)).toThrowError();
  });
});
