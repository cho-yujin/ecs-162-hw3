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

    // Construct url
    const url =
      'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location.contains%3A%22Sacramento%22 OR timesTag.location.contains%3A%22Davis%22&api-key=' +
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
    {#each allArticles as articleData}
      <Article {...articleData} />
    {/each}
  </div>
</section>
