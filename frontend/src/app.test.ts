import { beforeAll, assert, test } from "vitest";
import { render, screen } from "@testing-library/svelte";
import App from "./App.svelte";
import Article from "./components/article.svelte";
import Navbar from "./components/navbar.svelte";
import { getApiKey, fetchArticles } from "./logic/fetchFunctions";

let data: any = null;
beforeAll(async () => {
  const apiKey = await getApiKey();
  const url =
    'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location.contains%3A%22Sacramento%22 OR timesTag.location.contains%3A%22Davis%22&api-key=' +
    apiKey;
  data = await fetchArticles(url);
});

// Checks that API key is a non-empty string.
test("API key from Flask server is correct", async () => {
  const apiKey = await getApiKey();
  assert(apiKey != null);
  assert(typeof apiKey === "string");
  assert(apiKey.length != 0);
});

// Checks that all fetched data contains the necessary article elements.
test("Fetched data is formatted correctly", async () => {
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
  for (const dataObject of data.response.docs) {
    let keywords = dataObject.keywords
    keywords
      .filter((keyword: any) => keyword.name === "Location")
      .filter((keyword: any) => keyword.value.includes("sacramento") || keyword.value.includes("davis"));
    
    // If keywords does not have any objects in it,
    // then no articles related to sac/davis were found and test fails.
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

  // Check that all parts of article are rendering properly
  screen.getByTestId('articleHeader');
  screen.getByTestId('url');
  screen.getByTestId('thumbnail');
  screen.getByTestId('abstract');
  screen.getByTestId('time');
});

// Gets current date and compares it with date displayed on page.
test("Date at top of the page is correct", () => {
  render(Navbar);
  // gets today's date
  const todaysdate = new Date().toString().slice(0, 16);
 // checks that the date on the document is equivalent to today's date 
  let correctDate = screen.getByTestId('dateInfo').textContent!.includes(todaysdate); 
  // screen.debug(screen.getByTestId('dateInfo')); 
  assert(correctDate); 
});