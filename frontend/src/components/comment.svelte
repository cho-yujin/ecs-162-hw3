<script lang="ts">
  export type commentProps = {
    username: string;
    userIcon: string;
    content: string;
  };

  const props: commentProps = $props();
</script>

<div class="flex-col">
    <div class="flex-row">
        <img class="user-icon" src={props.userIcon} alt="Profile icon" />
        <p class="comments-username">{props.username}</p>
    </div>
    <p class="comments-text">{props.content}</p>
    <button>Reply</button>
</div>
