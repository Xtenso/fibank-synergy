import { Page } from "@playwright/test";

export async function login(page: Page, username: string, password: string) {
  await page.goto("/en/auth/login");
  await page.locator("#username").fill(username);
  await page.locator("#password").fill(password);
  await page.locator('button[type="submit"]').click();
}

export async function register(
  page: Page,
  userData: {
    uin: string;
    nameCyrillic: string;
    nameLatin: string;
    email: string;
    phoneNumber: string;
    address: string;
    username: string;
    password: string;
  }
) {
  await page.goto("/en/auth/register");

  await page.locator("#uin").fill(userData.uin);
  await page.locator("#nameCyrillic").fill(userData.nameCyrillic);
  await page.locator("#nameLatin").fill(userData.nameLatin);
  await page.locator("#email").fill(userData.email);
  await page.locator("#phoneNumber").fill(userData.phoneNumber);
  await page.locator("#address").fill(userData.address);
  await page.locator("#username").fill(userData.username);
  await page.locator("#password").fill(userData.password);
  await page.locator("#confirmPassword").fill(userData.password);

  await page.locator('button[type="submit"]').click();
}
