import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite'

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
            on(
                'file:preprocessor',
                vitePreprocessor({
                    configFile: resolve(__dirname, './vite.config.js'),
                    mode: 'development'
                }),
            )
        },
    },
});
