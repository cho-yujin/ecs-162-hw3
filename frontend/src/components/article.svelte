<script lang="ts">
  export type ArticleData = {
    title: string;
    abstract: string;
    thumbnail: string; // url to thumbnail image
    caption: string;
    url: string;
  };

  const props: ArticleData = $props();
</script>

<div class="firstColumn">
  <div class="second">
    <h3 class="title1">{props.title}</h3>
    <a href={props.url}>
      <img class="thumbnail" src={props.thumbnail} alt={props.caption} />
    </a>
    <p>{props.abstract}</p>
    <p class="time">1000 MIN READ</p>
    <hr />
  </div>
</div>
