<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar.svelte";
  import Article, { type ArticleData } from "./components/Article.svelte";
  import { getApiKey, fetchArticles } from "./logic/fetchFunctions";

  let allArticles: ArticleData[] = [];
  let apiKey: string = "";
  let url: string = "";
  let pageNum = 0;

  function constructArticleObject(dataObject: any): ArticleData {
    return {
      title: dataObject.headline.main,
      abstract: dataObject.abstract,
      thumbnail: dataObject.multimedia.default.url,
      caption: dataObject.multimedia.caption,
      url: dataObject.web_url,
    };
  }

  async function getNewArticles(url: string, apiKey: string) {
    let apiKeyParam = "&api-key=" + apiKey;
    let pageNumParam = "&page=" + pageNum;
    pageNum += 1;

    url =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location.contains%3A%22Sacramento%22 OR timesTag.location.contains%3A%22Davis%22" +
      apiKeyParam + pageNumParam;

    // Fetch articles
    const data = await fetchArticles(url);

    // Put article objects into array
    for (const dataObject of data.response.docs) {
      allArticles.push(constructArticleObject(dataObject));
    }
    // Triggers rerender
    allArticles = allArticles;
  }

  onMount(async () => {
    // Get apiKey from Flask backend
    apiKey = await getApiKey();

    // Fetch articles and put into allArticles array
    getNewArticles(url, apiKey);
  });
</script>

<section class="main">
  <Navbar />
  <div class="body">
    {#each allArticles as articleData}
      <Article {...articleData} />
    {/each}
  </div>
  <div class="center">
    <button on:click={() => getNewArticles(url, apiKey)}>Load more articles</button>
  </div>
</section>
