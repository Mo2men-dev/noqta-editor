import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
	await page.goto("/");
	await expect(page).toHaveTitle(/Noqta Demo/);

	const paragraph = page.locator("p");
	await paragraph.click();
	await page.keyboard.press("Control+A");
	await page.keyboard.press("Control+C");

	const bubbleMenu = page.locator(".noqta-bubble-menu");
	await bubbleMenu.waitFor({ state: "visible" });

	const tableButton = bubbleMenu.locator('button[title="Table"]');
	await tableButton.click();
});

test("CustomTableComponent create 3x3 table from BubbleMenu", async ({ page }) => {
	const table = page.locator("table");
	await expect(table).toBeVisible();

	const rows = await table.locator("tr").count();
	expect(rows).toBe(3);

	const headerCells = await table.locator("th").count();
	expect(headerCells).toBe(3);

	const bodyCells = await table.locator("td").count();
	expect(bodyCells).toBe(6);
});

test("CustomTableComponent should have correct options", async ({ page }) => {
	const tableControls = page.locator(".table-controls");

	const options = await tableControls
		.locator("button")
		.evaluateAll((buttons) => buttons.map((button) => button.getAttribute("title")));

	expect(options).toContain("Add Row");
	expect(options).toContain("Add Column");
	expect(options).toContain("Merge/Split Cells");
	expect(options).toContain("Toggle Header Row");
	expect(options).toContain("Toggle Header Column");
	expect(options).toContain("Toggle Header Cell");
	expect(options).toContain("Delete Row");
	expect(options).toContain("Delete Column");
	expect(options).toContain("Delete Table");
});

test("CustomTableComponent should add row and column", async ({ page }) => {
	const tableControls = page.locator(".table-controls");

	const addRowButton = tableControls.locator('button[title="Add Row"]');
	await addRowButton.click();

	const addColumnButton = tableControls.locator('button[title="Add Column"]');
	await addColumnButton.click();

	const table = page.locator("table");
	const rows = await table.locator("tr").count();
	expect(rows).toBe(4); // 3 original + 1 added

	const headerCells = await table.locator("th").count();
	expect(headerCells).toBe(4); // 3 original + 1 added

	const bodyCells = await table.locator("td").count();
	expect(bodyCells).toBe(12); // 6 original + 6 added (1 for each new row and column)
});

test("CustomTableComponent should merge cells", async ({ page }) => {
	const tableControls = page.locator(".table-controls");

	const mergeButton = tableControls.locator('button[title="Merge/Split Cells"]');

	const firstCell = page.locator("table tr:nth-child(2) td:nth-child(2)");
	await firstCell.click();

	await page.keyboard.down("Shift");

	const secondCell = page.locator("table tr:nth-child(2) td:nth-child(3)");
	await secondCell.click();

	await page.keyboard.up("Shift");
	await mergeButton.click();

	const table = page.locator("table");
	const bodyCells = await table.locator("td").count();
	const mergedCells = await table.locator("td[colspan='2']").count();

	expect(mergedCells).toBe(1); // 1 cell should be merged
	expect(bodyCells).toBe(5); // 5 body cells should remain
});

test("CustomTableComponent should delete row and column", async ({ page }) => {
	const tableControls = page.locator(".table-controls");

	const deleteRowButton = tableControls.locator('button[title="Delete Row"]');
	const deleteColumnButton = tableControls.locator('button[title="Delete Column"]');

	await deleteRowButton.click();

	const table = page.locator("table");

	let rows = await table.locator("tr").count();
	expect(rows).toBe(2); // 1 row deleted, 2 remaining

	let bodyCells = await table.locator("td").count();
	expect(bodyCells).toBe(6); // 6 body cells should remain

	await deleteColumnButton.click();

	rows = await table.locator("tr").count();
	expect(rows).toBe(2); // 2 rows should remain

	const headerCells = await table.locator("th").count();
	expect(headerCells).toBe(0); // 0 header cells should remain

	bodyCells = await table.locator("td").count();
	expect(bodyCells).toBe(4); // 4 body cells should remain
});

test("CustomTableComponent should delete table", async ({ page }) => {
	const tableControls = page.locator(".table-controls");

	const deleteTableButton = tableControls.locator('button[title="Delete Table"]');
	await deleteTableButton.click();

	const table = page.locator("table");
	expect(await table.isVisible()).toBeFalsy(); // Table should be deleted
});

test("CustomTableComponent should toggle header row and column", async ({ page }) => {
	const tableControls = page.locator(".table-controls");

	const toggleHeaderRowButton = tableControls.locator('button[title="Toggle Header Row"]');
	const toggleHeaderColumnButton = tableControls.locator('button[title="Toggle Header Column"]');

	await toggleHeaderRowButton.click();

	const table = page.locator("table");
	let headerCells = await table.locator("th").count();
	expect(headerCells).toBe(0); // 0 header cells should be present

	await toggleHeaderRowButton.click();
	await toggleHeaderColumnButton.click();

	headerCells = await table.locator("th").count();
	expect(headerCells).toBe(5); // 5 header cells should be present again
});

test("CustomTableComponent should toggle header cell", async ({ page }) => {
	const tableControls = page.locator(".table-controls");

	const toggleHeaderCellButton = tableControls.locator('button[title="Toggle Header Cell"]');

	const firstCell = page.locator("table tr:nth-child(2) td:nth-child(2)");
	await firstCell.click();

	await toggleHeaderCellButton.click();

	let headerCells = await page.locator("table th").count();
	expect(headerCells).toBe(4); // 1 header cell should be present

	await toggleHeaderCellButton.click();

	headerCells = await page.locator("table th").count();
	expect(headerCells).toBe(3); // 1 header cell should be removed
});
