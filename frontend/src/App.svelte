<script lang="ts">
  import { onMount } from "svelte";
  import Navbar from "./components/navbar.svelte";
  import Article, { type ArticleData } from "./components/article.svelte";
  import Sidebar from "./components/sidebar.svelte";
  import { getApiKey, fetchArticles, fetchUser } from "./logic/getFunctions";
  import { getAllComments } from "./logic/commentFunctions";

  let sidebarTitle = $state("Default title");
  let articleID = $state("");
  let userInfo = $state(null);
  let allComments = $state([]);

  async function refreshComments() {
    // const newComments = await getAllComments();
    // allComments.splice(0, allComments.length, ...newComments);
    // allComments = allComments;
    window.location.reload();
  }

  function toggleSidebar(title: string, id: string) {
    let sidebar = document.getElementById("sidebar")!;
    let overlay = document.getElementById("overlay")!;

    articleID = id;
    sidebarTitle = title;

    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  }

  let allArticles: Omit<ArticleData, "allComments">[] = $state([]);
  let apiKey: string = "";
  let url: string = "";
  let pageNum = 0;

  function constructArticleObject(dataObject: any): Omit<ArticleData, "allComments"> {
    return {
      id: dataObject._id,
      title: dataObject.headline.main,
      abstract: dataObject.abstract,
      thumbnail: dataObject.multimedia.default.url,
      caption: dataObject.multimedia.caption,
      url: dataObject.web_url,
      toggleSidebar: toggleSidebar,
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
    userInfo = await fetchUser();
    // Get apiKey from Flask backend
    apiKey = await getApiKey();
    // Fetch articles and put into allArticles array
    getNewArticles(url, apiKey);
    // Fetches comments and stores into allComments array
    allComments = await getAllComments();
  });
</script>

<section class="main">
  <!-- Sidebar and overlay -->
  <div id="overlay"></div>
  <Sidebar
    title={sidebarTitle}
    toggleSidebar={() => toggleSidebar(sidebarTitle, articleID)}
    {allComments}
    {userInfo}
    {articleID}
    {refreshComments}
  />

  <div class="body-content">
    <Navbar {userInfo} />
    <!-- Renders one element for each article in articleData -->
    <div class="body">
      {#each allArticles as articleData}
        <Article allComments={allComments} {...articleData} />
      {/each}
    </div>
    <div class="button-container">
      <button class="dark-button" onclick={() => getNewArticles(url, apiKey)}
        >Load more articles</button
      >
    </div>
  </div>
</section>
