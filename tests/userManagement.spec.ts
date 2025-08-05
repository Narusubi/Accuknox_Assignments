import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login';
import { DashboardPage } from '../pages/dashboard';
import { AdminPage } from '../pages/userdetails';

// Test Data
const credentials = {
  username: 'Admin',
  password: 'admin123',
};

const newUser = {
  username: 'testuser123',
  password: 'Password@123',
  employeeName: 'Amruta Patil',
  userRole: 'ESS',
  status: 'Enabled',
};

test.describe('User Management E2E - OrangeHRM', () => {
  test.beforeEach(async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login(credentials.username, credentials.password);
  });

  test('Add a New User', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const admin = new AdminPage(page);
    await dashboard.goToAdmin();
    await admin.addUser(newUser);
    await expect(page.getByText('Successfully Saved')).toBeVisible();
  });

  test('Search the Newly Created User', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const admin = new AdminPage(page);
    await dashboard.goToAdmin();
    await admin.searchUser(newUser.username);
    await expect(page.locator(`div.oxd-table-cell:has-text("${newUser.username}")`)).toBeVisible();
  });

  test('Edit User Details', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const admin = new AdminPage(page);
    await dashboard.goToAdmin();
    await admin.editUser(newUser.username, { status: 'disabled' });
    await expect(page.getByText('Successfully Updated')).toBeVisible();
  });

  test('Delete the User', async ({ page }) => {
    const dashboard = new DashboardPage(page);
    const admin = new AdminPage(page);
    await dashboard.goToAdmin();
    await admin.deleteUser(newUser.username);
    await expect(page.getByText('Successfully Deleted')).toBeVisible();
  });
});
