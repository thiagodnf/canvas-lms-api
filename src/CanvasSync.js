import PageAPI from "./api/resources/PageAPI.js";
import PathUtils from "./utils/PathUtils.js";
import Logger from "./utils/Logger.js";
import Parser from "./Parser.js";

export default class CanvasSync {

    constructor(options = {}) {

        const defaults = {
            canvasApiUrl: "",
            canvasApiToken: "",
            canvasCourseId: ""
        };

        options = { ...defaults, ...options };

        PathUtils.createFolders("./content/pages");
        PathUtils.createFolders("./content/assignments");
        PathUtils.createFolders("./content/resources/styles");
        PathUtils.createFolders("./content/resources/extensions");
        PathUtils.createFolders("./content/resources/templates");
        PathUtils.createFolders("./content/resources/templates/partials");

        this.parser = new Parser();

        this.pageAPI = new PageAPI(options);
    }

    async sync(resourceName, path, api) {

        Logger.info(`------------------------------------------------------`);
        Logger.info(`Synchronizing ${resourceName}...`);
        Logger.info(`------------------------------------------------------`);

        const files = this.parser.parse(path);

        let index = 0;

        for (const file of files.values()) {

            Logger.info(`[${index + 1}/${files.size}] ${file.base}`);

            await api.sync(file.name, file.html, file.metadata);

            index++
        }

        Logger.info(`------------------------------------------------------`);
        Logger.info("Done");
        Logger.info(`------------------------------------------------------`);
    }

    async syncPages() {
        await this.sync("Pages", './content/pages/**.md', this.pageAPI);
    }
}
