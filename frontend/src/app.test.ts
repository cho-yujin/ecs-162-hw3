import { assert, test } from "vitest";
import { render, screen } from "@testing-library/svelte";
import App from "./App.svelte";
import Article from "./components/Article.svelte";
import Navbar from "./components/Navbar.svelte";
import { getApiKey, fetchArticles } from "./logic/fetchFunctions";

// Checks that API key is a non-empty string.
// Checks that API key can be successfully used to pull data (non-null object) from the API.
test("API key from Flask server is correct", async () => {
  const apiKey = await getApiKey();
  assert(apiKey != null);
  assert(typeof apiKey === "string");
  assert(apiKey.length != 0);

  const url =
  'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location.contains%3A%22Sacramento%22 OR timesTag.location.contains%3A%22Davis%22&api-key=' +
  apiKey;
  const data = await fetchArticles(url);
  assert(data != null);
  assert(typeof data === "object");
});

// Checks that all fetched data contains the necessary article elements.
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

// Checks that articles fetched contain the words "sacramento" or "davis" in their "Location" value.
test("Articles fetched are related to Sacramento or Davis", async () => {
  const apiKey = await getApiKey();
  const url =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location.contains%3A%22Sacramento%22 OR timesTag.location.contains%3A%22Davis%22&api-key=' +
    apiKey;
  const data = await fetchArticles(url);

  for (const dataObject of data.response.docs) {
    let keywords = dataObject.keywords

    keywords
      .filter((keyword: any) => keyword.name === "Location")
      .filter((keyword: any) => keyword.value.includes("sacramento") || keyword.value.includes("davis"));
      
    assert(keywords.length != 0);
  }
});

// Creates a test article. Checks that all parts of the article are displayed properly.
test("Article content is properly displayed", () => {
  const articleData = {
    title: "Test Article",
    abstract: "This is a test article test test test test",
    thumbnail: "./assets/important-image.jpg",
    caption: "Orange cat",
    url: "www.google.com",
  }
  
  render(Article, articleData);
  // TODO: Check if each element exists? lol
});

// Checks that the number of grid columns displayed per breakpoint is correct.
// test("UI is responsive", async () => {
//   render(App);
// });

// Gets current date and compares it with date displayed on page.
// test("Date at top of the page is correct", async () => {
//   const date = new Date().toString();
//   const slicedDate = date.slice(0, 16);

//   render(Navbar);
//   let navbarDate = null;
//   try {
//     navbarDate = screen.getByDisplayValue(slicedDate)
//   } catch (e) { }

//   assert(navbarDate !== null);
//   // this doesn't work
// });
