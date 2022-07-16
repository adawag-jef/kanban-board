const { validationResult } = require("express-validator");
const mongose = require("mongoose");

exports.validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

exports.isObjectId = (value) => mongose.Types.ObjectId.isValid(value);
