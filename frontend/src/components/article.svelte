<script lang="ts">
  import { filterComments } from '../logic/commentFunctions';
  import type { commentType } from './comment.svelte';
  import commentsIcon from '/comments-icon.svg'


  export type ArticleData = {
    id: string;
    title: string;
    abstract: string;
    thumbnail: string; // url to thumbnail image
    caption: string;
    url: string;
    toggleSidebar: (title: string, id: string) => void; // fn to toggle sidebar
    allComments: commentType[];
  };

  const props: ArticleData = $props();
  let articleComments = $derived(filterComments(props.allComments, props.id))
</script>

<div class="firstColumn">
  <div class="second">
    <h3 data-testid="articleHeader" class="title1">{props.title}</h3>
    <a data-testid="url" href={props.url}>
      <img data-testid="thumbnail" class="thumbnail" src={props.thumbnail} alt={props.caption} />
    </a>
    <p data-testid="abstract">{props.abstract}</p>
    <p data-testid="time" class="time">1000 MIN READ</p>

    <div class="flex-row justify-end">
      <button class="comments-button" onclick={() => props.toggleSidebar(props.title, props.id)}>
        <img src={commentsIcon} alt={props.caption}/>
        {articleComments.length}
      </button>
    </div>
  </div>
  <br />
  <hr />
</div>
