import { test, expect } from '@playwright/test';

test.describe('Demo QA - elements page', () => {
  test('has title', async ({ page }) => {
    await page.goto('https://demoqa.com/elements');
    await expect(page).toHaveTitle("DEMOQA");
  });

  test('opens elements Text Box', async ({ page }) => {
    await expect(page.getByText('Elements').nth(1)).toBeVisible();
  });
});