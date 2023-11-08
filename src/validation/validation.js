const ValidationTypes = require('./validationTypes');

const validation = (schema, dataLocation) => {
  if (Object.values(ValidationTypes).indexOf(dataLocation) === -1) {
    throw new Error('Invalid validation data location');
  }

  return (req, res, next) => {
    let data;
    switch (dataLocation) {
      case ValidationTypes.BODY:
        data = req.body;
        break;
      case ValidationTypes.QUERY:
        data = req.query;
        break;
      case ValidationTypes.PARAMS:
        data = req.params;
        break;
      default:
        data = {};
        break;
    }

    const { error } = schema.validate(data);
    if (error) {
      return res.status(400).json(error.details[0].message);
    }
    next();
  };
};

module.exports = validation;
