import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
	testDir: "./src/tests/playwright", // Adjust this path if your tests are elsewhere
	timeout: 30 * 1000, // 30 seconds per test
	expect: {
		timeout: 5000, // 5 seconds for expect conditions
	},
	fullyParallel: true, // Run tests in parallel
	retries: 0, // Set to 1 or 2 if you want flaky test retries
	reporter: [["list"], ["html", { open: "never" }]],
	use: {
		baseURL: "http://localhost:5173/", // Replace with your local dev URL
		trace: "on-first-retry", // Collect trace only when retrying
		video: "retain-on-failure",
		screenshot: "on",
		headless: true,
		viewport: { width: 1280, height: 720 },
	},
	projects: [
		{
			name: "Chromium",
			use: { ...devices["Desktop Chrome"] },
		},
		{
			name: "WebKit",
			use: { ...devices["Desktop Safari"] },
		},
	],
});
