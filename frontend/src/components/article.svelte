<script lang="ts">
  export type ArticleData = {
    id: string | number;
    title: string;
    abstract: string;
    thumbnail: string; // url to thumbnail image
    caption: string;
  };

  const props: ArticleData = $props();
</script>

<div class="firstColumn">
  <div class="second">
    <h3 class="title1">{props.title}</h3>
    <img src={props.thumbnail} alt={props.caption} />
    <p>{props.abstract}</p>
    <p class="time">1000 MIN READ</p>
    <hr />
  </div>
</div>
