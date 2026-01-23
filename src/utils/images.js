// src/assets/images.ts
import { readFileSync } from "fs";
import { resolvePath } from "paths.js";

export const IMAGES = {
    start: readFileSync(resolvePath("images", "start.png")),
    quest: readFileSync(resolvePath("images", "quest.png")),
    // trophy: readFileSync(resolvePath("images", "trophy.png")),
};
