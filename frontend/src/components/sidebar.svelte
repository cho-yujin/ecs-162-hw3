<script lang="ts">
  import Comment from "./comment.svelte";

  export type SidebarProps = {
    title: string;
    toggleSidebar: (title: string) => void;
    allComments: any;
    numComments: Number;
  };

  const props: SidebarProps = $props();
</script>

<aside id="sidebar">
  <div class="sticky sidebar-header">
    <div class="flex-row justify-between small-gap">
      <h1 class="sidebar-header-text">{props.title}</h1>
      <button class="x-button" onclick={() => props.toggleSidebar(props.title)}>X</button>
    </div>
    <hr />
    <br />
  </div>
  <div class="sidebar-content">
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

      <div class="flex-row justify-end small-gap">
        <button class="cancel-button">CANCEL</button>
        <button class="submit-button">SUBMIT</button>
      </div>

      <div class="flex-col comments-content">
        {#each props.allComments as commentData}
          <Comment {...commentData} />
          <hr />
        {/each}
      </div>
    </div>
  </div>
</aside>
