import { test, expect } from "@playwright/test";

// This test suite Requires the `smartTyping` extension to be disabled
// in the editor configuration, to prevent the automatic insertion symbols
// like backticks when typing.
test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Noqta Demo/);

	const paragraph = page.locator("p");
	await paragraph.click();
	await page.keyboard.press("Control+A");
});

test("CodeBlockComponent should render code block with plaintext", async ({ page }) => {
	await page.keyboard.type("```\n");
	const codeBlock = page.locator(".code-block");
	await expect(codeBlock).toBeVisible();

	const select = codeBlock.locator("select");
	await expect(select).toHaveValue("plaintext");
});

test("CodeBlockComponent should change language on select change", async ({ page }) => {
	await page.keyboard.type("```\n");

	const codeBlock = page.locator(".code-block");
	codeBlock.click();
	await page.keyboard.type("console.log");

	let tokenEl = codeBlock.locator("span");
	await expect(tokenEl).toHaveCount(0);

	const select = codeBlock.locator("select");
	await select.selectOption("javascript");

	tokenEl = codeBlock.locator("span");
	await expect(select).toHaveValue("javascript");
	await expect(tokenEl).toHaveCount(2);
});

test("CodeBlockComponent should render code block with selected language", async ({ page }) => {
	await page.keyboard.type("```javascript\nconsole.log");

	const codeBlock = page.locator(".code-block");
	await expect(codeBlock).toBeVisible();

	const tokenEl = codeBlock.locator("span");
	await expect(tokenEl).toHaveCount(2);
});
