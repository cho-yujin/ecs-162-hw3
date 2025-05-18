<script>
    let { isLoggedIn, username } = $props();
</script>

{#if isLoggedIn}
    <div class="flex-col align-end">
        <p class="profile-username">{username}</p>
        <a href="http://localhost:8000/logout" class="logout-button">Log out</a>
    </div>
{:else}
    <a href="http://localhost:8000/login" class="login-button"> Log in </a>
{/if}
