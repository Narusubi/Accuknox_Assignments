import { Page } from '@playwright/test';

export class AdminPage {
  constructor(private page: Page) {}

  // Navigate to the Admin module (can be moved to DashboardPage if needed)
  async goToAdmin() {
    await this.page.click('span:has-text("Admin")');
    await this.page.waitForURL('**/admin/viewSystemUsers');
  }

  // Add a new user
  async addUser(user: {
    username: string;
    password: string;
    employeeName: string;
    userRole: string;
    status: string;
  }) {
    await this.page.click('button:has-text("Add")');

    await this.selectFromDropdown('User Role', user.userRole);
    await this.fillAutoSuggestField('Employee Name', user.employeeName);
    await this.page.fill('input[placeholder="Username"]', user.username);
    await this.selectFromDropdown('Status', user.status);
    await this.page.fill('input[placeholder="Password"]', user.password);
    await this.page.fill('input[placeholder="Confirm Password"]', user.password);

    await this.saveChanges();
  }

  // Search for a user
  async searchUser(username: string) {
    await this.page.fill('input[placeholder="Username"]', username);
    await this.page.click('button:has-text("Search")');
    await this.page.waitForSelector(`div.oxd-table-cell:has-text("${username}")`);
  }

  // Edit an existing user (e.g., change status)
  async editUser(username: string, changes: { status?: string }) {
    await this.searchUser(username);
    await this.clickEditButton(username);

    if (changes.status) {
      await this.selectFromDropdown('Status', changes.status);
    }

    await this.saveChanges();
  }

  // Delete a user
  async deleteUser(username: string) {
    await this.searchUser(username);
    const row = this.page.locator(`div.oxd-table-row:has-text("${username}")`);
    const deleteButton = row.locator('button[title="Delete"]');
    await deleteButton.click();
    await this.page.click('button:has-text("Yes, Delete")');
  }

  // --------------------------
  // 🔽 Helper Methods
  // --------------------------

  // Select from any dropdown using label
  async selectFromDropdown(label: string, value: string) {
    const dropdown = this.page.locator(`label:has-text("${label}")`).locator('xpath=..').locator('div.oxd-select-text');
    await dropdown.click();

    const options = this.page.locator('div[role="option"]');
    const count = await options.count();

    for (let i = 0; i < count; i++) {
      const optionText = await options.nth(i).innerText();
      if (optionText.trim().toLowerCase() === value.trim().toLowerCase()) {
        await options.nth(i).click();
        return;
      }
    }

    throw new Error(`Option "${value}" not found in dropdown labeled "${label}"`);
  }

  // Fill an auto-suggest field (like Employee Name)
  async fillAutoSuggestField(label: string, inputText: string) {
    const input = this.page.locator(`label:has-text("${label}")`).locator('xpath=..').locator('input');
    await input.fill(inputText);

    const suggestion = this.page.locator(`div[role="option"]:has-text("${inputText}")`);
    await suggestion.first().waitFor({ state: 'visible', timeout: 5000 });
    await suggestion.first().click();
  }

  // Click edit button next to the username
  async clickEditButton(username: string) {
    const row = this.page.locator(`div.oxd-table-row:has-text("${username}")`);
    const editButton = row.locator('button[title="Edit"]');
    await editButton.click();
  }

  // Click Save button
  async saveChanges() {
    await this.page.click('button:has-text("Save")');
  }
}
