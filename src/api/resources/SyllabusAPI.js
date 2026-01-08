import HttpClient from "../HttpClient.js";

import Logger from "../../utils/Logger.js";

export default class SyllabusAPI {

    constructor(options) {

        this.httpClient = new HttpClient(options);

        this.baseUrl = `/api/v1/courses/${options.canvasCourseId}`;
    }

    async sync(title, content, settings = {}) {

        Logger.debug("Updating " + title)

        const payload = {
            course: {
                syllabus_body: content,
                syllabus_course_summary: settings.enable_course_summary || false
            }
        }

        return await this.httpClient.put(this.baseUrl, payload);
    }
}
