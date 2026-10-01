import { test, expect } from "@playwright/test";
test("customer and operations complete procurement through the UI", async ({
  page,
  browser,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      name: "Strong foundations. Smarter procurement.",
    }),
  ).toBeVisible();
  await page.screenshot({
    path: "tmp/qa/catalogue-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Add to list" }).first().click();
  await page
    .getByRole("button", { name: "Material list, 1 materials" })
    .click();
  await page
    .getByRole("button", { name: "Sign in to request a quotation" })
    .click();
  await page.getByLabel("Mobile number").fill("7999999901");
  await page.getByLabel("Your name").fill("Aditi Builder");
  await page.getByRole("button", { name: "Get a test code" }).click();
  const notice = await page.locator(".notice").innerText();
  const code = notice.match(/\b\d{6}\b/)![0];
  await page.getByLabel("One-time code").fill(code);
  await page.getByRole("button", { name: "Verify & sign in" }).click();
  await page.getByLabel("Project / site name").fill("Green Valley residence");
  await page.getByLabel("Delivery address").fill("Plot 14, Patia, Bhubaneswar");
  await page.getByLabel("Delivery pincode").fill("751024");
  await page
    .getByLabel("Requirements / notes")
    .fill("Morning delivery preferred");
  await page.getByRole("button", { name: "Submit material request" }).click();
  await expect(
    page.getByRole("heading", { name: "Green Valley residence" }),
  ).toBeVisible();
  const adminContext = await browser.newContext();
  const admin = await adminContext.newPage();
  admin.on("pageerror", (e) => errors.push(e.message));
  await admin.goto("/");
  await admin.getByRole("button", { name: "Sign in", exact: true }).click();
  await admin.getByRole("button", { name: "Operations", exact: true }).click();
  await admin.getByLabel("Mobile number").fill("9000000000");
  await admin
    .getByLabel("Password", { exact: true })
    .fill("e2e-operations-password");
  await admin.getByRole("button", { name: "Sign in to operations" }).click();
  await admin.getByRole("button", { name: "Add supplier quote" }).click();
  await admin
    .getByLabel("Freight, inclusive of applicable tax (₹)")
    .fill("1200");
  await admin.getByRole("button", { name: "Publish quotation" }).click();
  await expect(
    admin.getByRole("heading", { name: "Supplier quotations" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Refresh", exact: true }).click();
  await page.getByRole("button", { name: "Review & accept" }).click();
  await page
    .getByRole("button", { name: "Accept quotation & create order" })
    .click();
  await expect(page.locator(".status")).toHaveText("Confirmed");
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Welcome, Aditi." }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Orders & delivery", exact: true })
    .click();
  await expect(page.locator(".status")).toHaveText("Confirmed");
  await admin.getByRole("button", { name: "Refresh", exact: true }).click();
  await admin
    .getByRole("button", { name: "Orders & delivery", exact: true })
    .click();
  for (const status of ["Sourcing", "Dispatched", "Delivered"]) {
    await admin.getByRole("button", { name: "Manage order" }).click();
    await admin.getByLabel("Order status").selectOption(status);
    await admin.getByLabel("Vehicle / registration").fill("OD-02-AB-2026");
    await admin
      .getByLabel("Driver name & contact")
      .fill("Driver test, 7000000000");
    await admin
      .getByLabel("Internal liaison notes (operations only)")
      .fill("Internal test note");
    await admin.getByRole("button", { name: "Save order update" }).click();
    await expect(admin.locator(".status")).toHaveText(status);
  }
  await admin.screenshot({
    path: "tmp/qa/operations-desktop.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Refresh", exact: true }).click();
  await expect(page.locator(".status")).toHaveText("Delivered");
  await expect(page.getByText("Internal test note")).toHaveCount(0);
  await page
    .getByRole("button", { name: "Delivery challan", exact: true })
    .click();
  await expect(page.locator(".print-document")).toContainText("OD-02-AB-2026");
  await page.screenshot({ path: "tmp/qa/challan.png", fullPage: true });
  await page.emulateMedia({ media: "print" });
  await expect(page.locator(".print-document")).toBeVisible();
  await page.screenshot({ path: "tmp/qa/challan-print.png", fullPage: true });
  await page.emulateMedia({ media: "screen" });
  await page.getByRole("button", { name: "Close dialog" }).click();
  await page.setViewportSize({ width: 390, height: 844 });
  await page.getByRole("button", { name: "Materials", exact: true }).click();
  await page.screenshot({
    path: "tmp/qa/catalogue-mobile.png",
    fullPage: true,
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.getByRole("button", { name: "My workspace", exact: true }).click();
  await page
    .getByRole("button", { name: "Orders & delivery", exact: true })
    .click();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({ path: "tmp/qa/orders-mobile.png", fullPage: true });
  expect(errors).toEqual([]);
  await adminContext.close();
});
