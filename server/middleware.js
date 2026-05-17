const rateLimit = require("express-rate-limit");


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, //15 minutes window
  max: 100, //100 request allowed
});


module.exports = limiter