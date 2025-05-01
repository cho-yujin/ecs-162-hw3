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