const Joi = require("@hapi/joi");

const validateBody = (schema) => {
  return (req, res, next) => {
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json(result.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value.body) req.value.body = {};
      req.value.body = result.value;
      next();
    }
  };
};

const validateParam = (schema, name) => {
  return (req, res, next) => {
    // console.log(schema);
    const validatorResult = schema.validate({ param: req.params[name] });
    if (validatorResult.error) {
      return res.status(400).json(validatorResult.error);
    } else {
      if (!req.value) req.value = {};
      if (!req.value["params"]) req.value.params = {};
      req.value.params[name] = req.params[name];
      next();
    }
  };
};

const schemas = {
  idSchema: Joi.object().keys({
    param: Joi.string()
      .regex(/^[0-9a-fA-F]{24}$/)
      .required(),
  }),
  userSchema: Joi.object().keys({
    firstname: Joi.string().min(2).required(),
    lastname: Joi.string().min(2).required(),
    email: Joi.string().email().required(),
  }),
  userOptionalSchma: Joi.object().keys({
    firstname: Joi.string().min(2),
    lastname: Joi.string().min(2),
    email: Joi.string().email(),
  }),
};

module.exports = {
  validateBody,
  validateParam,
  schemas,
};
