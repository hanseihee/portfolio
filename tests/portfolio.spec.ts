import { expect, test } from "@playwright/test";

test("project sculpture changes shape, responds to dragging, and opens a project", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await page.getByRole("button", { name: "Helix", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Helix", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  const canvas = page.locator("canvas").first();
  const bounds = (await canvas.boundingBox())!;
  await page.mouse.move(
    bounds.x + bounds.width / 2,
    bounds.y + bounds.height / 2,
  );
  await page.mouse.down();
  await page.mouse.move(
    bounds.x + bounds.width / 2 + 80,
    bounds.y + bounds.height / 2 + 30,
    { steps: 12 },
  );
  await expect(page.locator(".orbit-stage")).toHaveClass(/is-dragging/);
  await page.mouse.up();
  await expect(page.locator(".orbit-stage")).not.toHaveClass(/is-dragging/);
  await page.locator(".orbit-label-0").click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "Esports.op.gg" }),
  ).toBeVisible();
  await expect(
    page.getByRole("dialog").getByRole("link", { name: "프로젝트 방문" }),
  ).toHaveAttribute("href", "https://esports.op.gg/");
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.locator(".orbit-label-0")).toBeFocused();
  expect(errors).toEqual([]);
});

test("archive filters, expands, changes layout, and opens details", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .locator(".archive-filters")
    .getByRole("button", { name: "개발" })
    .click();
  await expect(page.locator(".archive-project")).toHaveCount(6);
  await page.getByRole("button", { name: "1개 프로젝트 더 보기" }).click();
  await expect(page.locator(".archive-project")).toHaveCount(7);
  await page.getByRole("button", { name: "그리드 보기" }).click();
  await expect(page.locator(".archive-projects")).toHaveClass(/archive-grid/);
  await page
    .locator(".archive-project")
    .filter({ hasText: "B2B 메신저" })
    .click();
  await expect(
    page.getByRole("dialog").getByRole("heading", { name: "B2B 메신저" }),
  ).toBeVisible();
});

test("command search supports no results, keyboard selection, and escape", async ({
  page,
}) => {
  await page.goto("/");
  await page.keyboard.press("Control+k");
  const query = page.getByRole("textbox", { name: "검색어" });
  await expect(query).toBeFocused();
  await query.fill("no-such-project-123");
  await expect(
    page.getByText("검색 결과가 없습니다.", { exact: false }),
  ).toBeVisible();
  await query.fill("Swift");
  await expect(page.locator(".search-result")).toHaveCount(2);
  await query.press("ArrowDown");
  await query.press("Enter");
  await expect(
    page.locator(".project-dialog").getByRole("heading", { name: "영어하자" }),
  ).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.locator("dialog[open]")).toHaveCount(0);
  await expect(page.locator("body")).not.toHaveCSS("overflow", "hidden");
});

test("career chapters are fully keyboard navigable", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("tab", { name: /The maker/ }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "직접 만들며 배운 것들",
  );
  await page.keyboard.press("End");
  await expect(page.getByRole("tab", { name: /Still curious/ })).toBeFocused();
  await expect(page.getByRole("tabpanel")).toContainText(
    "다음 가능성을 만드는 중",
  );
  await page.getByRole("button", { name: "이전 경력", exact: true }).click();
  await expect(page.getByRole("tabpanel")).toContainText(
    "아이디어를 성장하는 제품으로",
  );
});

test("language and motion preferences survive a reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Switch to English" }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await page
    .getByRole("button", { name: "Pause animation", exact: true })
    .click();
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator(".portfolio")).toHaveClass(/motion-reduced/);
  await expect(
    page.getByRole("button", { name: "Enable animation", exact: true }),
  ).toBeVisible();
});

test("PDF export produces a real downloadable file", async ({ page }) => {
  test.setTimeout(60_000);
  await page.goto("/");
  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("button", { name: "포트폴리오 PDF 받기" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("Sei-Hee-Han-Portfolio-ko.pdf");
  expect(await download.failure()).toBeNull();
  const stream = await download.createReadStream();
  const chunks: Buffer[] = [];
  for await (const chunk of stream!) chunks.push(chunk);
  const pdf = Buffer.concat(chunks);
  expect(pdf.subarray(0, 4).toString()).toBe("%PDF");
  expect(pdf.byteLength).toBeGreaterThan(20_000);
});

test("mobile navigation stays at the bottom without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const nav = page.getByRole("navigation", { name: "주 메뉴" });
  const rect = (await nav.boundingBox())!;
  expect(rect.y).toBeGreaterThan(740);
  expect(rect.y + rect.height).toBeLessThan(844);
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
  await nav.getByRole("link", { name: "연락하기" }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(
    page.getByRole("link", { name: "이메일 보내기" }),
  ).toBeInViewport();
  await nav.getByRole("link", { name: "프로젝트" }).click();
  await page.locator(".featured-card").first().click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "프로젝트 닫기" }).click();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
});

test("system reduced motion is respected before interacting", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".portfolio")).toHaveClass(/motion-reduced/);
  await expect(
    page.getByRole("button", { name: "애니메이션 켜기" }),
  ).toBeVisible();
});
