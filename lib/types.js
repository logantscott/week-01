const isNumber = val => typeof val === 'number';
const isString = val => typeof val === 'string';
const isBoolean = val => typeof val === 'boolean';
const isArray = val => Array.isArray(val) === true;
const isObject = val => val === Object(val) && Array.isArray(val) === false && typeof(val) === 'object';
const isFunction = val => typeof val === 'function';

const castToNumber = val => {
  if(isNumber(val)) return val;
  const number = Number(val);
  if(isNaN(number)) throw new CastError(Number, val);
  return number;
};

const castToString = val => {
  if(isString(val)) return val;
  if(!['boolean', 'number', 'bigint'].includes(typeof(val))) throw new CastError(String, val);
  const string = String(val);
  return string;
};

const castToBoolean = val => {
  if(isBoolean(val)) return val;
  val = val === 1 || val === '1' || val === 'true' 
    ? true : val === 'false' || val === 0 || val === '0' 
      ? false : val;
  const bool = val;
  if(!isBoolean(bool)) throw new CastError(Boolean, bool);
  return bool;
};

class CastError extends Error {
  constructor(Type, value) {
    const type = Type.name;
    super(`Cannot cast >>${value}<< to ${type}`);
    this.type = type;
    this.value = value;
  }
}

const casters = {
  Number: castToNumber,
  String: castToString,
  Boolean: castToBoolean
};

const getCaster = Type => {  
  return casters[Type.name] || null;
};



module.exports = {
  isNumber,
  CastError,
  getCaster,
  castToNumber,
  isString,
  castToString,
  isBoolean,
  isArray,
  isObject,
  isFunction,
  castToBoolean
};
