import { test, expect } from "@playwright/test";

test.describe("Login Form Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/auth/login");
  });

  // Username validation
  test("should validate username field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Username is required").first()
    ).toBeVisible();

    await page.locator("#username").fill("usr");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Username must be at least 5 characters long").first()
    ).toBeVisible();

    await page.locator("#username").fill("invalid@user");
    await page.locator('button[type="submit"]').click();
    await expect(
      page
        .locator("text=Username can only contain Latin letters, _ and -")
        .first()
    ).toBeVisible();
  });

  // Password validation
  test("should validate password field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Password is required").first()
    ).toBeVisible();

    await page.locator("#password").fill("pass");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Password must be at least 6 characters").first()
    ).toBeVisible();

    await page.locator("#password").fill("123456");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Password must contain at least one letter").first()
    ).toBeVisible();

    await page.locator("#password").fill("Password");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Password must contain at least one number").first()
    ).toBeVisible();

    await page.locator("#password").fill("Pass€word123");
    await page.locator('button[type="submit"]').click();
    await expect(
      page
        .locator(
          "text=Password can only contain Latin letters, numbers, and special characters"
        )
        .first()
    ).toBeVisible();

    await page.locator("#password").fill("Thispasswordiswaytoolong123456");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Password must be at most 24 characters").first()
    ).toBeVisible();
  });
});
