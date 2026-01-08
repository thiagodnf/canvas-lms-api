export default class HttpClient {

    constructor({ canvasApiUrl, canvasApiToken }) {

        this.canvasApiUrl = canvasApiUrl;

        this.headers = {
            "Authorization": `Bearer ${canvasApiToken}`,
            "Content-Type": "application/json",
        };
    }

    async get(url) {

        const resource = `${this.canvasApiUrl}${url}`;

        const res = await fetch(resource, {
            method: "GET",
            headers: this.headers
        });

        return await this.processResponse(res);
    }

    async post(url, payload = {}) {

        const resource = `${this.canvasApiUrl}${url}`;

        const res = await fetch(resource, {
            method: "POST",
            headers: this.headers,
            body: JSON.stringify(payload),
        });

        return await this.processResponse(res);
    }

    async put(url, payload = {}) {

        const resource = `${this.canvasApiUrl}${url}`;

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
