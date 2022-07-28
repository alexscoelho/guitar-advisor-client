<script>
  import { onMount } from 'svelte';
  let guitars = []

  onMount(async () => {
    const res = await fetch('https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/')
    guitars = await res.json()
  })
</script>

<main>
  <h1>Guitar Advisor</h1>
  {JSON.stringify(guitars)}
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }
</style>
