import { expect, assert, test } from "vitest";
import { render } from "@testing-library/svelte";
import App from "./App.svelte";
import { getApiKey, fetchArticles } from "./logic/fetchFunctions";

// Tests getApiKey
test("API key from Flask server is correct", async () => {
  const apiKey = await getApiKey();

  assert(apiKey != "");
  assert(typeof apiKey === "string");
  assert(apiKey.length != 0);
});

// Tests fetchArticles
test("Fetched data is formatted correctly", async () => {
  const apiKey = await getApiKey();
  const url =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location.contains%3A%22Sacramento%22 OR timesTag.location.contains%3A%22Davis%22&api-key=' +
    apiKey;
  const data = await fetchArticles(url);

  for (const dataObject of data.response.docs) {
    assert("main" in dataObject.headline);
    assert("abstract" in dataObject);
    assert("url" in dataObject.multimedia.default);
    assert("caption" in dataObject.multimedia);
    assert("web_url" in dataObject);
  }
});

// test("Articles fetched are related to Sacramento", async () => {
//   render(App);
// });

// test("Article content is properly displayed", async () => {
//   render(App);
// });

// test("UI is responsive", async () => {
//   render(App);
// });

// test("Date at top of the page is correct", async () => {
//   render(App);
// });
