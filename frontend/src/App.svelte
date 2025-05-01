<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./components/Navbar.svelte";
  import Article, { type ArticleData } from "./components/Article.svelte";

  let allArticles: ArticleData[] = [];

  export async function getApiKey() {
    try {
      const res = await fetch("http://localhost:8000/api/key");
      const dataApi = await res.json();
      return dataApi.apiKey;
    } catch (error) {
      console.error("Failed to fetch API key:", error);
    }
    return null;
  }

  export async function fetchArticles(url: string) {
    try {
      const res = await fetch(url);
      return await res.json();
    } catch (error) {
      console.error("Failed to fetch article info", error); // error message if something wrong happens with fetching the article
    }
    return null;
  }

  function constructArticleObject(dataObject: any): ArticleData {
    return {
      id: dataObject._id,
      title: dataObject.headline.main,
      abstract: dataObject.abstract,
      thumbnail: dataObject.multimedia.default.url,
      caption: dataObject.multimedia.caption,
    };
  }

  onMount(async () => {
    // Get apiKey from Flask backend
    const apiKey = await getApiKey();

    // Construct url
    const url =
      'https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=timesTag.location.contains%3A%22Sacramento%22 OR timesTag.location.contains%3A%22Davis%22&api-key=' +
      apiKey;
    console.log("URL:", url);

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
