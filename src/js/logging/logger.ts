import logger from "loglevel"
import IsProduction from "../util/env"

logger.setLevel(IsProduction ? "silent" : "debug")

export default logger
