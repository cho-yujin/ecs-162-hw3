<script>
    let { userInfo } = $props();
</script>

{#if userInfo && userInfo["signed_in"]}
    <div class="profile-info">
        <p class="profile-username">Hi, <strong>{userInfo.user["name"]}</strong>!</p>
        <a href="http://localhost:8000/logout" class="logout-button">Log out</a>
    </div>
{:else}
    <a href="http://localhost:8000/login" class="login-button"> Log in </a>
{/if}
