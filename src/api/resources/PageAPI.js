import HttpClient from "../HttpClient.js";

export default class PageAPI {

    constructor(options) {

        this.httpClient = new HttpClient(options);

        this.baseUrl = `/api/v1/courses/${options.canvasCourseId}/pages`;
    }

    async create(title, body, settings = {}) {

        const payload = {
            wiki_page: {
                title,
                body,
                published: settings.published || false
            }
        }

        return await this.httpClient.post(`${this.baseUrl}`, payload);
    }

    async update(urlOrId, body, settings = {}) {

        const payload = {
            wiki_page: {
                body,
                published: settings.published || false
            }
        }

        return await this.httpClient.put(`${this.baseUrl}/${urlOrId}`, payload);
    }

    async fetchByTitle(title) {

        const titleEncoded = encodeURIComponent(title);

        const url = `${this.baseUrl}?search_term=${titleEncoded}`;

        const rows = await this.httpClient.get(url);

        return rows.filter(r => r.title.trim().toLowerCase() === title.trim().toLowerCase());
    }

    async sync(title, content, settings = {}) {

        const pages = await this.fetchByTitle(title);

        if (pages.length === 0) {
            await this.create(title, content, settings);
        } else if (pages.length === 1) {
            await this.update(pages[0].page_id, content, settings);
        } else {
            throw new Error(`The page search returned > 1 page for "${title}"`);
        }
    }

}
