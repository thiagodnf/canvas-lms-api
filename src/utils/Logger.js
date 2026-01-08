import { createLogger, format, transports } from "winston";;

import Config from "./Config.js";

const { combine } = format;

export default class Logger {

    static logger = createLogger({
        level: Config.LOG_LEVEL,
        format: combine(
            format.colorize(),
            format.simple()
        ),
        transports: [
            new transports.Console()
        ]
    });

    static info(message) {
        this.logger.info(message);
    }

    static debug(message) {
        this.logger.debug(message);
    }
}
