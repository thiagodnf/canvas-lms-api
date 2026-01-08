import CanvasSync from "./src/CanvasSync.js";

const canvasSync = new CanvasSync({
    canvasApiUrl: "",
    canvasApiToken: "",
    canvasCourseId: ""
});

await canvasSync.syncPages();

export { CanvasSync };
