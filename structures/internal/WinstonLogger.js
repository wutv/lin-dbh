const winston = require("winston");

/**
 * Logger configuration.
 * @param {Object}
 */

const conf = {
  levels: {
    error: 0,
    debug: 1,
    warn: 2,
    data: 3,
    success: 4,
    info: 5,
    verbose: 6,
    silly: 7,
    custom: 8,
  },
  colors: {
    error: "red",
    debug: "blue",
    warn: "magenta",
    data: "gray",
    success: "brightGreen",
    info: "grey",
    verbose: "cyan",
    silly: "brightMagenta",
    custom: "yellow",
  },
};

winston.addColors(conf.colors);

const logger = (module.exports = winston.createLogger({
  levels: conf.levels,
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
  level: "custom",
}));
