const {
  isNumber,
  castToNumber,
  getCaster,
  isString,
  castToString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToBoolean
} = require('../lib/types.js');

describe('validator module', () => {
  describe('basic validation', () => {
    it('properly tells if a value is a numbers', () => {
      expect(isNumber(3)).toBeTruthy();
      expect(isNumber('hi')).toBeFalsy();
      expect(isNumber([])).toBeFalsy();
      expect(isNumber({})).toBeFalsy();
      expect(isNumber(() => {})).toBeFalsy();
      expect(isNumber(true)).toBeFalsy();
    });

    it('properly tells if a value is a string', () => {
      expect(isString(3)).toBeFalsy();
      expect(isString('hi')).toBeTruthy();
      expect(isString([])).toBeFalsy();
      expect(isString({})).toBeFalsy();
      expect(isString(() => {})).toBeFalsy();
      expect(isString(true)).toBeFalsy();
    });

    it('properly tells if a value is a boolean', () => {
      expect(isBoolean(3)).toBeFalsy();
      expect(isBoolean('hi')).toBeFalsy();
      expect(isBoolean([])).toBeFalsy();
      expect(isBoolean({})).toBeFalsy();
      expect(isBoolean(() => {})).toBeFalsy();
      expect(isBoolean(true)).toBeTruthy();
      expect(isBoolean(1)).toBeFalsy();
      expect(isBoolean('1')).toBeFalsy();
      expect(isBoolean('true')).toBeFalsy();
    });

    it('properly tells if a value is an array', () => {
      expect(isArray(3)).toBeFalsy();
      expect(isArray('hi')).toBeFalsy();
      expect(isArray([])).toBeTruthy();
      expect(isArray({})).toBeFalsy();
      expect(isArray(() => {})).toBeFalsy();
      expect(isArray(true)).toBeFalsy();
    });

    
    it('properly tells if a value is an object', () => {
      expect(isObject(3)).toBeFalsy();
      expect(isObject('hi')).toBeFalsy();
      expect(isObject([])).toBeFalsy();
      expect(isObject({})).toBeTruthy();
      expect(isObject(() => {})).toBeFalsy();
      expect(isObject(true)).toBeFalsy();
      expect(isObject(null)).toBeFalsy();
      expect(isObject(undefined)).toBeFalsy();
    });

    
    it('properly tells if a value is a function', () => {
      expect(isFunction(3)).toBeFalsy();
      expect(isFunction('hi')).toBeFalsy();
      expect(isFunction([])).toBeFalsy();
      expect(isFunction({})).toBeFalsy();
      expect(isFunction(() => {})).toBeTruthy();
      expect(isFunction(true)).toBeFalsy();
    });
  });


  describe('casters', () => {
    it('can cast values to a number', () => {
      expect(castToNumber(3)).toEqual(3);
      expect(castToNumber('3')).toEqual(3);
      expect(castToNumber(true)).toEqual(1);
      expect(castToNumber(false)).toEqual(0);
    });

    it('throws if value is not castable to number', () => {
      expect(() => castToNumber('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToNumber({})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a string', () => {
      expect(castToString(3121)).toEqual('3121');
      expect(castToString(true)).toEqual('true');
      expect(castToString(false)).toEqual('false');
    });

    it('throws if value is not castable to string', () => {
      expect(() => castToString({})).toThrowErrorMatchingSnapshot();
      expect(() => castToString([])).toThrowErrorMatchingSnapshot();
      expect(() => castToString(null)).toThrowErrorMatchingSnapshot();
      expect(() => castToString(undefined)).toThrowErrorMatchingSnapshot();
      expect(() => castToString(function(){return 'hi';})).toThrowErrorMatchingSnapshot();
    });

    it('can cast values to a Boolean', () => {
      expect(castToBoolean(1)).toEqual(true);
      expect(castToBoolean(0)).toEqual(false);
      expect(castToBoolean(true)).toEqual(true);
      expect(castToBoolean(false)).toEqual(false);
      expect(castToBoolean('1')).toEqual(true);
      expect(castToBoolean('false')).toEqual(false);
      expect(castToBoolean('0')).toEqual(false);
    });

    it('throws if value is not castable to Boolean', () => {
      expect(() => castToBoolean('hi')).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean({})).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean([])).toThrowErrorMatchingSnapshot();
      expect(() => castToBoolean('2')).toThrowErrorMatchingSnapshot();
    });
  });

  it('can get the right caster', () => {
    expect(getCaster(Number)).toEqual(castToNumber);
    expect(getCaster(String)).toEqual(castToString);
    expect(getCaster(Boolean)).toEqual(castToBoolean);
    expect(getCaster(Promise)).toBeNull();
  });

  
});
