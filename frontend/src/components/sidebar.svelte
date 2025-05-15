<script lang="ts">
  import Comment from "./comment.svelte";

  export type SidebarProps = {
    title: string;
    visible: boolean;
    toggleSidebar: () => void;
    allComments: any;
    numComments: Number;
  };

  const props: SidebarProps = $props();
</script>

<aside class="sidebar">
  <div class="flex-row justify-between">
    <h1 class="sidebar-header">{props.title}</h1>
    <button class="cancel-button" onclick={props.toggleSidebar}>X</button>
  </div>
  <hr />
  <br />
  <br />

  <div class="w-full">
    <div class="flex-row comments-header align-end">
      <h1 class="comments-header">Comments</h1>
      <p class="comments-number">{props.numComments}</p>
    </div>

    <textarea
      class="comment-input"
      id="comment"
      name="comment"
      placeholder="Share your thoughts..."
    ></textarea>
    <button>Post comment</button>
    {#each props.allComments as commentData}
      <Comment {...commentData} />
    {/each}
  </div>
</aside>
