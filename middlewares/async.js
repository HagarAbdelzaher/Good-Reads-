module.exports = function asyncFunction(routeHandler) {
  return async function (req, res, next) {
    try {
      await routeHandler(req, res, next);
    } catch (err) {
      next(err);
    }
  };
};
