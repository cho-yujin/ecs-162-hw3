<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar.svelte";
  import Article, { type ArticleData } from "./components/Article.svelte";
  import { getApiKey, fetchArticles } from "./logic/fetchFunctions";

  let allArticles: ArticleData[] = [];

  function constructArticleObject(dataObject: any): ArticleData {
    return {
      title: dataObject.headline.main,
      abstract: dataObject.abstract,
      thumbnail: dataObject.multimedia.default.url,
      caption: dataObject.multimedia.caption,
      url: dataObject.web_url,
    };
  }

  onMount(async () => {
    // Get apiKey from Flask backend
    const apiKey = await getApiKey();
    const queryParam = "%22UC%20Davis%22";

    // Construct url
    // const url =
    //   "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" +
    //   queryParam +
    //   "&api-key=" +
    //   apiKey;
    const url =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=davis&api-key=" +
      apiKey;
    // TODO: When user scrolls to bottom of page, call 10 more articles + push into allArticles

    // Fetch articles
    const data = await fetchArticles(url);

    // Put article objects into array
    for (const dataObject of data.response.docs) {
      allArticles.push(constructArticleObject(dataObject));
    }
    // Triggers rerender
    allArticles = allArticles;
  });
</script>

<section class="main">
  <Navbar />

  <div class="body">
    <!-- Split into 3 different columns, the first and second is for the ipad view -->
    {#each allArticles as articleData}
      <Article {...articleData} />
    {/each}
  </div>
</section>
