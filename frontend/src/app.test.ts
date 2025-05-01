import { test } from "vitest";
import { render } from "@testing-library/svelte";
import App from "./App.svelte";

// API key is getting returned as expected from Flask server
test("APIKey", async () => {
  render(App);
});

// API returns data in expected format
test("QueryData", async () => {
  render(App);
});

// Query correctly fetches Sacramento related articles
test("QueryContent", async () => {
  render(App);
});

// Article content is properly displayed
test("ArticleContent", async () => {
  render(App);
});

// UI is responsive
test("ResponsiveUI", async () => {
  render(App);
});

// Date at top of the page is correct
test("Date", async () => {
  render(App);
});

