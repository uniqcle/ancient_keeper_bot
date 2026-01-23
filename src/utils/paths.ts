// src/utils/paths.ts
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const PROJECT_ROOT = join(__dirname, "../../");

export function resolvePath(...parts: string[]): string {
    return join(PROJECT_ROOT, ...parts);
}
