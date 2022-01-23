import logger from "loglevel"
import IsProduction from "./env"

logger.setLevel(IsProduction ? "silent" : "debug")

export default logger
