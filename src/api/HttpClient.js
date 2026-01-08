import Config from "../utils/Config.js";

const CANVAS_API_URL = Config.CANVAS_API_URL;
const CANVAS_API_TOKEN = Config.CANVAS_API_TOKEN;

export default class HttpClient {

    constructor() {
        this.headers = {
            "Authorization": `Bearer ${CANVAS_API_TOKEN}`,
            "Content-Type": "application/json",
        };
    }

    async get(url) {

        const resource = `${CANVAS_API_URL}${url}`;

        const res = await fetch(resource, {
            method: "GET",
            headers: this.headers
        });

        return await this.processResponse(res);
    }

    async post(url, payload = {}) {

        const resource = `${CANVAS_API_URL}${url}`;

        const res = await fetch(resource, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(payload),
        });

        return await this.processResponse(res);
    }

    async put(url, payload = {}) {

        const resource = `${CANVAS_API_URL}${url}`;

        const res = await fetch(resource, {
            method: "PUT",
            headers: this.headers,
            body: JSON.stringify(payload),
        });

        return await this.processResponse(res);
    }

    async processResponse(res) {

        if (!res.ok) {
            throw new Error(`${res.status} ${res.statusText}`);
        }

        return await res.json();
    }
}
