import { defineConfig } from 'cypress';
import path from 'path';
import { fileURLToPath } from 'url';
import webpackPreprocessor from '@cypress/webpack-preprocessor';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      const options = {
        webpackOptions: {
          resolve: {
            alias: {
              '@': path.resolve(__dirname, './src'),
            },
            extensions: ['.js', '.jsx', '.ts', '.tsx'],
          },
          module: {
            rules: [
              {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'ts-loader',
                  options: {
                    transpileOnly: true,
                  },
                },
              },
            ],
          },
        },
        watchOptions: {},
      };

      on('file:preprocessor', webpackPreprocessor(options));
    },
    baseUrl: 'http://localhost:3000',
  },
});

