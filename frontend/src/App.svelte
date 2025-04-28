<script lang="ts">
  import { onMount } from 'svelte';
  import svelteLogo from './assets/svelte.svg';
  import viteLogo from '/vite.svg';
  import Counter from './lib/Counter.svelte';

  let apiKey: string = '';

  onMount(async () => {
    
    try {
      const res = await fetch('/api/key');
      const data = await res.json();
      //console.log(data);
      apiKey = data.apiKey;
    } catch (error) {
      console.error('Failed to fetch API key:', error);
    }
  });
</script>

<main>
  <div>
    <a href="https://vite.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>New York Times</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Your API Key: <strong>{apiKey}</strong>
  </p>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
  </p>
</main>

<style>

</style>
