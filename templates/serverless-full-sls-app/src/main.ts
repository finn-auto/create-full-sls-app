import "source-map-support/register";
import { config } from "dotenv";

import StatusHandler from "./handlers/status";

config();

export const Status = StatusHandler;
