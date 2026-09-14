import { test, expect } from '@playwright/test'

test('文字居中', async ({ page }) => {
  page.on('pageerror', (exception) => expect(exception).toBeNull())
  await page.goto('alert#center')

  const alert = page.locator('#center .tiny-mobile-alert')

  await expect(alert).toBeVisible()
  await expect(alert).toHaveClass(/is-center/)
  await expect(alert).toHaveCSS('justify-content', 'center')
})
