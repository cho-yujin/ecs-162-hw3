<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./components/navbar.svelte";
  import Article, { type ArticleData } from "./components/article.svelte";
  import Sidebar from "./components/sidebar.svelte"
  import { getApiKey, fetchArticles } from "./logic/fetchFunctions";

  let isSidebarVisible = $state(false);

  function toggleSidebar() {
    isSidebarVisible = !isSidebarVisible;
  }

  let allArticles: ArticleData[] = $state([]);
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
      toggleSidebar: toggleSidebar,
      commentsNumber: 0,
    };
  }

  async function getNewArticles(url: string, apiKey: string) {
    let apiKeyParam = "&api-key=" + apiKey;
    let pageNumParam = "&page=" + pageNum;
    pageNum += 1;

    url =
      "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=UC%20Davis" +
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
  <!-- Sidebar and overlay -->
  <div class="overlay"></div>
  <div class="flex-row justify-end">
    <Sidebar 
      title="Reallly really important news article!! Why is the title so long? Who knows" 
      visible={isSidebarVisible}
      toggleSidebar={toggleSidebar}
      allComments={[1, 2, 3]}
      numComments={10} />
  </div>

  <Navbar />

  <!-- Renders one element for each article in articleData -->
  <div class="body">
    {#each allArticles as articleData}
      <Article {...articleData} />
    {/each}
  </div>
  <div class="button-container">
    <button class="dark-button" onclick={() => getNewArticles(url, apiKey)}>Load more articles</button>
  </div>
</section>
