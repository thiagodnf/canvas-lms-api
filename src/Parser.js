import showdown from "showdown";
import juice from "juice";
import yaml from "js-yaml";
import mustache from "mustache";

import PathUtils from "./utils/PathUtils.js";

export default class Parser {

    constructor() {

        this.converter = new showdown.Converter({
            ghCompatibleHeaderId: true,
            tables: true,
            metadata: true,
            parseImgDimensions: true,
            extensions: []
        });

        this.cssMap = PathUtils.readFolder('./content/resources/styles/**.**');
        this.templateMap = PathUtils.readFolder('./content/resources/templates/**.**');
        this.partialsMap = PathUtils.readFolder('./content/resources/templates/partials/**.**');

        this.loadExtensions();
    }

    applyTemplate({ metadata }) {

        const { template, view } = metadata;

        const { content } = this.templateMap.get(template);

        const partials = Object.fromEntries(
            [...this.partialsMap].map(([, v]) => [v.name, v.content])
        );

        return mustache.render(content, view, partials);
    }

    applyCSS(html, styles = []) {

        const cssContents = styles.map(style => {
            const css = this.cssMap.get(style);
            if (!css) throw new Error(`${style} not found`);
            return css.content;
        });

        const rawHtml = `<style>${cssContents.join("\n")}</style>${html}`;

        return juice(rawHtml, {
            preserveMediaQueries: false,
            removeStyleTags: true,
            preserveFontFaces: false
        });
    }

    loadExtensions() {

        const files = PathUtils.readFolder("./content/resources/extensions");

        console.log(files)
        // const files = fs.readdirSync(dir).filter(f => f.endsWith(".js"));
        // const extensions = [];

        // for (const file of files) {
        //     const mod = await import(pathToFileURL(path.join(dir, file)));
        //     const ext = mod.default;
        //     extensions.push(typeof ext === "function" ? ext() : ext);
        // }

        // return extensions;
    }

    parse(path) {

        const files = PathUtils.readFolder(path);

        for (const file of files.values()) {

            Object.assign(file, this.makeHtml(file.content));

            const { styles, template } = file.metadata;

            if (template) {
                file.html = this.applyTemplate(file);
            }

            file.html = this.applyCSS(file.html, styles);
        }

        return files;
    }

    makeHtml(stringAsMarkdown) {

        const html = this.converter.makeHtml(stringAsMarkdown);
        const rawMetadata = this.converter.getMetadata(true);
        const metadata = yaml.load(rawMetadata) || {};

        return { metadata, html };
    }
}
