<script lang="ts">
  export type commentProps = {
    username: string;
    userIcon: string;
    content: string;
  };

  const props: commentProps = $props();
</script>

<div class="flex-col comment">
    <div class="flex-row">
        <img class="user-icon" src={props.userIcon} alt="Profile icon" />
        <p class="comments-username">{props.username}</p>
    </div>
    <p class="comments-text">{props.content}</p>
    
    <div class="flex-row">
        <button class="reply-button">Reply</button>
    </div>
</div>
