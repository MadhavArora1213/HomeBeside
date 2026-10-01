import { chromium } from "@playwright/test";
const browser = await chromium.launch();
const mob = await browser.newPage({ viewport: { width: 390, height: 844 } });
await mob.goto("http://localhost:3000/login", { waitUntil: "networkidle" });
const boxes = await mob.evaluate(() => {
  const g = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return [Math.round(b.x), Math.round(b.y), Math.round(b.width), Math.round(b.height)]; };
  const byText = (t) => [...document.querySelectorAll("a,button,h1,p,span,div")].find((e) => e.childElementCount === 0 && e.textContent.trim() === t);
  return {
    logo: g(document.querySelector("main a")),
    card: g(document.querySelector("main .rounded-3xl")),
    h1: g(document.querySelector("h1")),
    tabs: g(document.querySelector("[role=group]")),
    phoneActive: g([...document.querySelectorAll("[role=group] button")][0]),
    input: g(document.querySelector("input")),
    cont: g([...document.querySelectorAll("button")].find((b) => b.textContent.trim() === "Continue")),
    google: g([...document.querySelectorAll("button")].find((b) => b.textContent.includes("Google"))),
    terms: g(byText("By continuing you agree to our Terms and Privacy Policy.")),
    back: g([...document.querySelectorAll("a")].find((a) => a.textContent.includes("Back to home"))),
    bodyBg: getComputedStyle(document.body).backgroundColor,
    bodyOverflowX: getComputedStyle(document.body).overflowX,
  };
});
console.log(JSON.stringify(boxes, null, 1));
await browser.close();
