import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	build: {
		lib: {
			entry: "src/index.ts",
			name: "noqta",
			fileName: (format) => `noqta.${format}.js`,
			formats: ["es", "umd"],
		},
		rollupOptions: {
			external: ["react", "react-dom"],
			output: {
				globals: {
					react: "React",
					"react-dom": "ReactDOM",
				},
			},
		},
	},
	test: {
		environment: "jsdom",
		globals: true,
		setupFiles: "./src/tests/setup.ts",
	},
});
