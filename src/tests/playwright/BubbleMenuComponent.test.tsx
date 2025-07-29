import { test, expect, type Locator } from "@playwright/test";

let paragraph: Locator;
let bubbleMenu: Locator;

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Noqta Demo/);

	paragraph = page.locator("p");
	await paragraph.click();
	await page.keyboard.press("Control+A");
	await page.keyboard.press("Control+C");

	bubbleMenu = page.locator(".bubble-menu");
	await bubbleMenu.waitFor({ state: "visible" });
});

test("BubbleMenuComponent should be visible when text is selected", async () => {
	expect(await bubbleMenu.isVisible()).toBeTruthy();
});

test("BubbleMenuComponent should have correct options", async () => {
	const options = await bubbleMenu
		.locator("button")
		.evaluateAll((buttons) => buttons.map((button) => button.getAttribute("title")));

	expect(options).toContain("Bold");
	expect(options).toContain("Italic");
	expect(options).toContain("Underline");
});

test("BubbleMenuComponent should apply formatting on click", async () => {
	const boldButton = bubbleMenu.locator('button[title="Bold"]');
	await boldButton.click();

	const selectedText = await paragraph.evaluate((el) => el.innerHTML);
	expect(selectedText).toBe("<strong>Start typing...</strong>");
});

test("BubbleMenuComponent should hide when clicking outside", async ({ page }) => {
	expect(await bubbleMenu.isVisible()).toBeTruthy();

	await page.click("body");
	expect(await bubbleMenu.isVisible()).toBeFalsy();
});
