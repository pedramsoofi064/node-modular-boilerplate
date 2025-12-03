const validatorCallback = require('../../../src/middlewares/validator-callback');
const { ValidationError } = require('../../../src/utils/api-errors');

const Ajv = require('ajv');

describe('validatorCallback', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {},
    };
    res = {};
    next = jest.fn();
  });

  it('should call next() if validation passes', () => {
    const schema = { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] };
    req.body = { name: 'John Doe' };

    const middleware = validatorCallback(schema);
    middleware(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should throw ValidationError if validation fails', () => {
    const schema = { type: 'object', properties: { name: { type: 'string' } }, required: ['name'] };
    req.body = {};

    const middleware = validatorCallback(schema);

    expect(() => middleware(req, res, next)).toThrow(ValidationError);
    try {
      middleware(req, res, next);
    } catch (error) {
      expect(error).toBeInstanceOf(ValidationError);
      
    }
  });
});
