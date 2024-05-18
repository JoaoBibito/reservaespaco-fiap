const isLogged = (req, res, next) => {
  return next();
};

export default {isLogged};
