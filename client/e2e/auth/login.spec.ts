import { test, expect } from "@playwright/test";
import { login } from "../helpers/auth";

test.describe("Login functionality", () => {
  test("should display login form", async ({ page }) => {
    await page.goto("/en/auth/login");

    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator("#username")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show error with invalid credentials", async ({ page }) => {
    await login(page, "wronguser", "wrongpass");

    const errorToast = page.locator('div[role="alert"]');
    await expect(errorToast).toBeVisible({ timeout: 5000 });
  });

  test("should login successfully with valid credentials", async ({ page }) => {
    await login(page, "testuser", "Test123!");

    await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

    // Additional verification that we're logged in
    const settingsElement = page.locator("text=Settings");
    await expect(settingsElement).toBeVisible({ timeout: 5000 });
  });
});
