import { test, expect } from '@playwright/test'

test.describe('全局加载', () => {
  test('指令方式加载', async ({ page }) => {
    page.on('pageerror', (exception) => expect(exception).toBeNull())
    await page.goto('loading#global-registry')

    const loading = page.locator('.tiny-mobile-loading')

    await page.locator('#global-registry .demo-loading .tiny-mobile-button').first().click()
    await expect(loading).toBeVisible()
    await expect(loading).toHaveClass(/is-fullscreen/)
    await page.waitForTimeout(3000)
    await expect(loading).not.toBeVisible()
  })

  test('静态方法加载', async ({ page }) => {
    page.on('pageerror', (exception) => expect(exception).toBeNull())
    await page.goto('loading#global-registry')

    const loading = page.locator('.tiny-mobile-loading')

    const btn = page.locator('#global-registry .demo-loading .tiny-mobile-button').filter({ hasText: '静态方法' })
    await btn.click()
    await expect(loading).toBeVisible()
    await page.waitForTimeout(3000)
    await expect(loading).not.toBeVisible()
  })
})
