<script>
  import UserProfile from "./userProfile.svelte";

  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date
  const date = new Date().toString();
  const currentDate = date.slice(0, 16);

  let { userInfo } = $props();
</script>

<header>
  <!-- This is where all the header stuff is like title and date  -->
  <div class="date">
    <p data-testid="dateInfo">{currentDate}</p>
    <p>Today's Paper</p>
  </div>
  <h1 class="nyt-heading">The New York Times</h1>
  <UserProfile userInfo={userInfo} />
</header>

<section class="secondHeader">
  <!-- This section is to represent NavBar -->
  <div class="navbar">
    <a href="#us">U.S. </a>
    <a href="#world">World </a>
    <a href="#business">Business </a>
    <a href="#arts">Arts </a>
    <a href="#lifestyle">Lifestyle </a>
    <a href="#opinion">Opinion </a>
    <!-- <div class="vert"></div> -->
    <a href="#audio">Audio </a>
    <a href="#games">Games </a>
    <a href="#cooking">Cooking </a>
    <a href="#wirecutter">Wirecutter </a>
    <a href="#athletic">Athletic </a>
  </div>
  <hr class="bold" />
  <hr class="bold" />
  <div class="live">
    <p>LIVE</p>
    <a href="#audio">Boba </a>
    <p class="time">9h ago</p>
    <a href="#Matcha">Matcha </a>
    <p class="time">1h ago</p>
    <a href="#audio">Coffee </a>
    <p class="time">2h ago</p>
  </div>
</section>
<hr class="bold" />
