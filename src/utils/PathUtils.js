import fs, { mkdirSync } from "fs";
import path from "path";
import { globSync } from "glob";

/**
 * PathUtils
 *
 * Utility class for basic filesystem path operations.
 */
export default class PathUtils {

    /**
     * Reads a file and returns its contents as a UTF-8 string.
     *
     * @param {string} path - Absolute or relative file path.
     * @returns {string} File contents.
     * @throws {Error} If the file does not exist or cannot be read.
     */
    static readFile(path) {
        return fs.readFileSync(path, "utf8");
    }

    /**
     * Creates a directory and all missing parent directories.
     *
     * @param {string} path - Directory path to create.
     * @throws {Error} If the directory cannot be created.
     */
    static createFolders(path) {
        mkdirSync(path, { recursive: true });
    }

    static readFolder(glob) {

        const filePaths = globSync(glob);

        const filesMap = new Map();

        for (const filePath of filePaths) {

            const file = path.parse(filePath);

            filesMap.set(file.base, {
                name: file.name,
                base: file.base,
                extension: file.ext,
                path: filePath,
                content: this.readFile(filePath)
            });
        }

        return filesMap;
    }
}
