import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { libInjectCss } from "vite-plugin-lib-inject-css";

// https://vite.dev/config/
export default defineConfig({
	plugins: [
		react({
			jsxImportSource: "react",
			babel: {
				plugins: [],
				presets: [],
			},
			jsxRuntime: "automatic",
			include: ["src/**/*"],
			exclude: ["node_modules/**/*"],
		}),
		libInjectCss(),
		dts({
			insertTypesEntry: true,
			tsconfigPath: "./tsconfig.app.json",
			include: ["src/**/*.{ts,tsx}"],
			exclude: ["src/tests/**/*", "node_modules/**/*"],
		}),
	],
	build: {
		lib: {
			entry: {
				index: "./src/index.ts",
				themes: "./src/themes.ts",
			},
			name: "noqta",
			formats: ["es"],
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
			jsx: "react-jsx",
		},
		sourcemap: false,
		cssCodeSplit: true,
		minify: true,
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./src/tests/setup.ts",
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			include: ["src/**/*.{ts,tsx}"],
			exclude: ["src/tests/**/*", "node_modules/**/*"],
		},
		include: ["./src/tests/vitest/**/*.{test,spec}.{ts,tsx}"],
	},
});
