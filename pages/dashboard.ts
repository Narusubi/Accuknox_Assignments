import { expect, Page } from '@playwright/test';

export class DashboardPage {
  constructor(private page: Page) {}

  async goToAdmin() {
    try {
      // Wait for sidebar or nav to be visible first (important on login)
      await this.page.waitForSelector('nav[role="navigation"]', { timeout: 10000 });

      // Define locator explicitly
      const adminTab = this.page.getByRole('link', { name: 'Admin' });

      // Wait for it to be visible and then click
      await expect(adminTab).toBeVisible({ timeout: 10000 });
      await adminTab.click();

      // Wait for the admin page to load
      await this.page.waitForURL('**/admin/viewSystemUsers', { timeout: 15000 });
      await this.page.waitForSelector('h6:has-text("System Users")', { timeout: 10000 });

    } catch (error) {
      await this.page.screenshot({ path: 'goToAdmin_failure.png', fullPage: true });
      console.error('Failed to go to Admin page:', error);
      throw error;
    }
  }
}








    // Optional: take screenshot for debug
    // await this.page.screenshot({ path: 'admin_page_loaded.png', fullPage: true });
  






    //await adminMenu.hover();

    // Click the Admin tab
    //await adminMenu.click();
   

    // Wait for the Admin page to be loaded
   // await expect(this.page.locator('h6')).toHaveText('System Users', { timeout: 10000 });
  




   



