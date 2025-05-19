<script lang="ts">
  export type commentType = {
    _id: string;
    article_id: string;
    username: string;
    comment: string;
  };

  const props: commentType = $props();
</script>

<div class="flex-col comment">
    <div class="flex-row small-gap align-center">
        <img class="user-icon" src={"/user-icon.svg"} alt="User icon" />
        <p class="comments-username">{props.username}</p>
    </div>
    <p class="comments-text">{props.comment}</p>
    
    <div class="flex-row">
        <button class="reply-button">Reply</button>
    </div>
</div>
