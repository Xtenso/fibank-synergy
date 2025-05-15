import { test, expect } from "@playwright/test";

test.describe("Registration Form Validation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/en/auth/register");
  });

  // UIN validation
  test("should validate UIN field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("text=UIN is required").first()).toBeVisible();

    await page.locator("#uin").fill("12345");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=UIN must be 10 characters long").first()
    ).toBeVisible();

    await page.locator("#uin").fill("123456789A");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=UIN can only contain numbers").first()
    ).toBeVisible();
  });

  // Cyrillic name validation
  test("should validate Cyrillic name field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Name in Cyrillic is required").first()
    ).toBeVisible();

    await page.locator("#nameCyrillic").fill("John Doe");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Please use only Cyrillic characters").first()
    ).toBeVisible();

    await page.locator("#nameCyrillic").fill("Иван");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Please enter full name (first and last name)").first()
    ).toBeVisible();

    await page.locator("#nameCyrillic").fill("Ив Пе");
    await page.locator('button[type="submit"]').click();
    await expect(
      page
        .locator("text=Each part of your name must be at least 3 characters")
        .first()
    ).toBeVisible();
  });

  // Latin name validation
  test("should validate Latin name field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Name in Latin is required").first()
    ).toBeVisible();

    await page.locator("#nameLatin").fill("Иван Иванов");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Please use only Latin characters").first()
    ).toBeVisible();
  });

  // Email validation
  test("should validate email field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("text=Email is required").first()).toBeVisible();

    await page.locator("#email").fill("invalidemail");
    await page.locator('button[type="submit"]').click();
    await expect(page.locator("text=Email is invalid").first()).toBeVisible();
  });

  // Phone number validation
  test("should validate phone number field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Phone number is required").first()
    ).toBeVisible();

    await page.locator("#phoneNumber").fill("12345");
    await page.locator('button[type="submit"]').click();
    await expect(
      page
        .locator("text=Phone number must be at least 10 characters long")
        .first()
    ).toBeVisible();

    await page.locator("#phoneNumber").fill("123456789a");
    await page.locator('button[type="submit"]').click();
    await expect(
      page
        .locator("text=Phone number can only contain numbers, spaces, + and -")
        .first()
    ).toBeVisible();
  });

  // Address validation
  test("should validate address field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Address is required").first()
    ).toBeVisible();

    await page.locator("#address").fill("Short");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Address must be at least 10 characters long").first()
    ).toBeVisible();
  });

  // Username validation
  test("should validate username field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Username is required").first()
    ).toBeVisible();

    await page.locator("#username").fill("user");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Username must be at least 5 characters long").first()
    ).toBeVisible();

    await page.locator("#username").fill("user@name");
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
  });

  // Confirm password validation
  test("should validate confirm password field", async ({ page }) => {
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Please confirm your password").first()
    ).toBeVisible();

    await page.locator("#confirmPassword").fill("Password124");
    await page.locator('button[type="submit"]').click();
    await expect(
      page.locator("text=Passwords don't match").first()
    ).toBeVisible();
  });

  // Password strength check
  test("should show password strength indicator", async ({ page }) => {
    await page.locator("#password").fill("pass12");
    await expect(page.locator('div:has-text("Weak")').first()).toBeVisible();

    await page.locator("#password").fill("Password123");
    await expect(page.locator('div:has-text("Strong")').first()).toBeVisible();

    await page.locator("#password").fill("StrongP@ssw0rd123!");
    await expect(
      page.locator('div:has-text("Very strong")').first()
    ).toBeVisible();
  });
});
