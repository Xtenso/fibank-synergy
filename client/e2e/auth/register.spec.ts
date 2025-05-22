import { test, expect } from "@playwright/test";
import { register } from "../helpers/auth";

test.describe("Registration functionality", () => {
  test("should display registration form", async ({ page }) => {
    await page.goto("/en/auth/register");

    await expect(page.locator("form")).toBeVisible();
    await expect(page.locator("#uin")).toBeVisible();
    await expect(page.locator("#nameCyrillic")).toBeVisible();
    await expect(page.locator("#nameLatin")).toBeVisible();
    await expect(page.locator("#email")).toBeVisible();
    await expect(page.locator("#username")).toBeVisible();
    await expect(page.locator("#password")).toBeVisible();
    await expect(page.locator("#confirmPassword")).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test("should show validation errors with invalid data", async ({ page }) => {
    await page.goto("/en/auth/register");
    await page.locator('button[type="submit"]').click();

    const errorMessage = await page.locator(".text-danger").first();
    await expect(errorMessage).toBeVisible();
  });

  test("should register successfully with valid data", async ({ page }) => {
    const timestamp = Date.now();
    const uniqueId = timestamp.toString(36).replace(/[0-9]/g, "_");

    await register(page, {
      uin: "1234567890",
      nameCyrillic: "Тест Тестов",
      nameLatin: "Test Testov",
      email: `test${timestamp}@example.com`,
      phoneNumber: "0888123456",
      address: "Sofia, Bulgaria, 1000",
      username: `testuser${uniqueId}`,
      password: "SecurePass123!",
    });

    await expect(page).toHaveURL(/dashboard/, { timeout: 10000 });

    // Additional verification that registration succeeded
    const settingsElement = page.locator("text=Settings");
    await expect(settingsElement).toBeVisible({ timeout: 5000 });
  });
});
