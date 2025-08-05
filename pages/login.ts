import { Page, expect } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  async goto() {
    await this.page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login', { timeout: 60000 });
  }

  async login(username: string, password: string) {
    const usernameInput = this.page.locator('input[name="username"]');
    const passwordInput = this.page.locator('input[name="password"]');

    await expect(usernameInput).toBeVisible();
    await usernameInput.fill(username);
    await passwordInput.fill(password);

    await this.page.locator('button[type="submit"]').click();
    await this.page.waitForURL('**/dashboard/index');
    await expect(this.page.locator('div.oxd-topbar-header-userarea')).toBeVisible();
  }
}

