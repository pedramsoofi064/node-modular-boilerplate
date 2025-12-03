const { ValidationError } = require('../utils/api-errors');
const Ajv = require("ajv");

/**
 *
 * @param schema
 */
module.exports = (schema) => (req, res, next) => {
  const ajv = new Ajv({ allErrors: true });
  const validate = ajv.compile(schema);
  const valid = validate(req.body);
  if (!valid) {
    const errors = validate.errors.map((err) => ({
      path: err.instancePath,
      messages:err,
    }));

    throw new ValidationError(errors);
  }
 
  return next();
};
