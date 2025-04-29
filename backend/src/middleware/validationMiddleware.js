
const { userValidator } = require('../utils/validators');

const validateUserInput = (req, res, next) => {
  const { error } = userValidator.validate(req.body);
  
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message
    });
  }
  
  next();
};

module.exports = {
  validateUserInput
};
