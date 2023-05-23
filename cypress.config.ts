import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { defineConfig } from "cypress";
import vitePreprocessor from 'cypress-vite'
import createBundler from "@bahmutov/cypress-esbuild-preprocessor";
import CCP from "@badeball/cypress-cucumber-preprocessor";
const { addCucumberPreprocessorPlugin } = CCP;
import { createEsbuildPlugin } from "@badeball/cypress-cucumber-preprocessor/esbuild";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
    experimentalWebKitSupport: true,
    video: false,
    e2e: {
        specPattern: "**/*.feature",
        async setupNodeEvents(on, config) {
            // implement node event listeners here

            await addCucumberPreprocessorPlugin(on, config);

            on(
                "file:preprocessor",
                createBundler({
                    target: 'esnext',
                    plugins: [createEsbuildPlugin(config)],
                })
            );

            // Make sure to return the config object as it might have been modified by the plugin.
            return config;

            // on(
            //     'file:preprocessor',
            //     vitePreprocessor({
            //         configFile: resolve(__dirname, './vite.config.js'),
            //         mode: 'development'
            //     }),
            // )
        },
    },
});
