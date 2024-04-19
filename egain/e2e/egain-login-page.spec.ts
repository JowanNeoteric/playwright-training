import { test, expect } from "@playwright/test";

test.describe("Egain - Login page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://edge.canary.egain.io/");
  });

  test('Has title, logo and proper body message', async ({ page }) => {
    await expect(page).toHaveTitle("Kiona Identity Portal");
    await expect(page.locator(".companyLogo")).toBeVisible();
    await expect(page.getByText("Sign in to Edge")).toBeVisible();
  });

  test("Verifies Username element", async ({ page }) => {
    const username = page.locator('#signInName');

    await expect(username).toBeVisible();
    await expect(username).toHaveAttribute("placeholder", "E-mail or username");
    await expect(username).toHaveAttribute("type", "text");
    await expect(username).toHaveAttribute("aria-label", "E-mail or username");
  });

  test("Verifies Password element", async ({ page }) => {
    const password = page.locator('#password');

    await expect(password).toBeVisible();
    await expect(password).toHaveAttribute("placeholder", "Password");
    await expect(password).toHaveAttribute("type", "password");
    await expect(password).toHaveAttribute("aria-label", "Password");
  });

  test("Verifies Forgot Your Password? element", async ({ page }) => {
    const forgotPassword = page.locator('#forgotPassword');
    var href = /kiona\.io\/B2C_1A_SeamlessMigration_SignUpOrSignIn\/api\/CombinedSigninAndSignup\/unified\?claimsexchange=ForgotPasswordExchange&csrf_token=/i;

    await expect(forgotPassword).toBeVisible();
    await expect(forgotPassword).toHaveText("Forgot your password?");
    await expect(forgotPassword).toHaveAttribute("href", href);
  });

  test("verifies SignIn button", async ({ page }) => {
    const submitButton = page.locator('#next');

    await expect(submitButton).toBeVisible();
    await expect(submitButton).toHaveText("Sign in");
    await expect(submitButton).toHaveAttribute("type", "submit");
  });

  test("Verifies divider", async ({ page }) => {
    const divider = page.locator(".divider")

    await expect(divider).toBeVisible();
    await expect(divider).toHaveText("or");
  });

  test("Verifies Azure Sign button", async ({ page }) => {
    const azureSignIn = page.locator("#AzureADOrganizationExchange");

    await expect(azureSignIn).toBeVisible();
    await expect(azureSignIn).toHaveText("Continue with Microsoft 365");
    await expect(azureSignIn).toHaveClass(/accountButton/);
    await expect(azureSignIn).toHaveAttribute("role", "link");
  });

  test("Verifies footer", async ({ page }) => {
    const footer = page.locator(".copyright");

    await expect(footer).toBeVisible();
    await expect(footer).toHaveText(`${"Copyright © Kiona AS 2001-2024"} ${"All rights reserved"}`);
  }
  );

  test("Logs in and out", async ({ page }) => {
    const username = page.locator('#signInName');
    const password = page.locator('#password');
    const submitButton = page.locator('#next');
    const profile = page.locator("app-user-avatar");
    const logoutButton = page.getByRole('menuitem', { name: 'Logout' })

    await username.fill("testegainstaff@egain.io");
    await password.fill("Test@2020");
    await submitButton.click();
    await expect(username).not.toBeVisible();
    await expect(password).not.toBeVisible();
    await expect(profile).toBeVisible();
    await expect(page).toHaveURL(/overview\?c=/);
    await profile.click();
    await (logoutButton).click();
    await expect(page).toHaveURL(/identity\.kiona\.io/);
  });
});
