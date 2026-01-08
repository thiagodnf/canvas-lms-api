// import * as dotenv from "dotenv";

// dotenv.config();

const Config = {
    CANVAS_API_URL: process.env.CANVAS_API_URL || "",
    CANVAS_API_TOKEN: process.env.CANVAS_API_TOKEN || "",
    CANVAS_COURSE_ID: process.env.CANVAS_COURSE_ID || "",
    LOG_LEVEL: process.env.LOG_LEVEL || "info"
};

export default Config;
