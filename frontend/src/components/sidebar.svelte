<script lang="ts">
  import Comment from "./comment.svelte";
  import {
    createComment,
    filterComments,
    getAllComments,
  } from "../logic/commentFunctions";
  import { onMount, untrack } from "svelte";

  export type SidebarProps = {
    title: string;
    toggleSidebar: (title: string, articleID: string) => void;
    allComments: any;
    userInfo: any;
    articleID: string;
    refreshComments(): () => void;
  };

  const props: SidebarProps = $props();
  let commentString = $state("");
  let articleComments = $derived(
    filterComments(props.allComments, props.articleID)
  );

  function onInput(event: any) {
    commentString = event.currentTarget.value;
  }

  function clearValue() {
    commentString = "";
    document.getElementById("error-text")!.style.visibility = "hidden";
  }

  onMount(() => {
    document.getElementById("error-text")!.style.visibility = "hidden";
  });
</script>

<aside id="sidebar">
  <div class="sticky sidebar-header">
    <div class="flex-row justify-between small-gap">
      <h1 class="sidebar-header-text">{props.title}</h1>
      <button
        class="x-button"
        onclick={() => props.toggleSidebar(props.title, "")}>X</button
      >
    </div>
    <hr />
    <br />
  </div>
  <div class="sidebar-content">
    <br />
    <div class="w-full">
      <div class="flex-row comments-header align-end">
        <h1 class="comments-header">Comments</h1>
        <p class="comments-number">{articleComments.length}</p>
      </div>

      <textarea
        class="comment-input"
        id="comment"
        name="comment"
        placeholder="Share your thoughts..."
        oninput={(e) => onInput(e)}
        value={commentString}
      ></textarea>

      <div class="flex-row justify-end">
        <p id="error-text">You cannot submit an empty comment.</p>
      </div>

      {#if props.userInfo && props.userInfo["signed_in"]}
        <div class="flex-row justify-end small-gap">
          <button class="cancel-button" onclick={clearValue}>CANCEL</button>
          <button
            class="submit-button"
            onclick={async () => {
              createComment(props.articleID, commentString, props.userInfo);
              clearValue();
              await props.refreshComments()
            }}>SUBMIT</button
          >
        </div>
      {:else}
        <p class="flex-row justify-end m-0">Log in to post comments :3</p>
      {/if}

      <div class="flex-col comments-content">
        {#each articleComments as commentData}
          <Comment {...commentData} />
          <hr />
        {/each}
      </div>
    </div>
  </div>
</aside>
