<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./components/navbar.svelte";
  import Article, { type ArticleData } from "./components/article.svelte";
  import Sidebar from "./components/sidebar.svelte";
  import { getApiKey, fetchArticles } from "./logic/fetchFunctions";
  import { getByTitle } from "@testing-library/svelte";

  let sidebarTitle = $state("Default title");

  function toggleSidebar(title: string) {
    let sidebar = document.getElementById("sidebar")!;
    let overlay = document.getElementById("overlay")!;

    sidebarTitle = title;

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
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
      apiKeyParam +
      pageNumParam;

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
  <div id="overlay"></div>
  <Sidebar
    title={sidebarTitle}
    toggleSidebar={() => toggleSidebar(sidebarTitle)}
    allComments={["comment", "comment", "comment", "comment", "comment", "comment", "comment", "comment", "comment", "comment"]}
    numComments={10}
  />

  <Navbar />

  <!-- Renders one element for each article in articleData -->
  <div class="body">
    {#each allArticles as articleData}
      <Article {...articleData} />
    {/each}
  </div>
  <div class="button-container">
    <button class="dark-button" onclick={() => getNewArticles(url, apiKey)}
      >Load more articles</button
    >
  </div>
</section>
