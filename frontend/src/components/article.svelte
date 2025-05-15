<script lang="ts">
  import commentsIcon from '/comments-icon.svg'

  export type ArticleData = {
    title: string;
    abstract: string;
    thumbnail: string; // url to thumbnail image
    caption: string;
    url: string;
    toggleSidebar: () => void; // fn to toggle sidebar
    commentsNumber: number;
  };

  const props: ArticleData = $props();
</script>

<div class="firstColumn">
  <div class="second">
    <h3 data-testid="articleHeader" class="title1">{props.title}</h3>
    <a data-testid="url" href={props.url}>
      <img data-testid="thumbnail" class="thumbnail" src={props.thumbnail} alt={props.caption} />
    </a>
    <p data-testid="abstract">{props.abstract}</p>
    <p data-testid="time" class="time">1000 MIN READ</p>

    <div class="justify-end">
      <button class="comments-button" onclick={props.toggleSidebar}>
        <img src={commentsIcon} alt={props.caption}/>
        {props.commentsNumber}
      </button>
    </div>
  </div>
  <br />
  <hr />
</div>
