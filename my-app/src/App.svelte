<script>
import { onMount } from 'svelte';
import CreateForm from './lib/CreateForm.svelte';
import ReviewForm from './lib/ReviewForm.svelte'
  let guitars = []
  let guitar;
  let price= ""
  let name= ""
  let brand= ""
  let description= ""
  let manufacturerCountry= ""
  let imageUrl= ""
  let reviewBody = ""
  let numStars = ""

  async function getGuitars() {
    const res = await fetch('https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/')
    guitars = await res.json()
  }

  onMount(async () => {
    getGuitars()
  })

  async function getGuitar (id) {
    const res = await fetch(`https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/${id}`)
    guitar = await res.json()
  }

  async function deleteGuitar (id) {
    const res = await fetch(`https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/${id}`, {
      method: "DELETE"
    })
    await res.json()
    getGuitars()
  }

</script>

<CreateForm getGuitars={getGuitars} name={name} brand={brand} price={price} description={description} manufacturerCountry={manufacturerCountry} imageUrl={imageUrl} />

<main>
  <div>
    <h1>Guitar Advisor</h1>
    <ul>
      {#each guitars as {name, price,id} }
      <li class="list-item">
        {name} - ${price}
        <button on:click={() =>getGuitar(id)}>Details</button>
        <button on:click={() =>deleteGuitar(id)}>Delete</button>
      </li>
      {/each}
    </ul>
  </div>

  <div class="details-container">
      <h1>Details</h1>
      {#if guitar !== undefined}
        <h2>{guitar?.name}</h2>
        <p>{guitar?.description}</p>
      {/if}
      <ReviewForm reviewBody={reviewBody} numStars={numStars} guitar={guitar}/>
  </div>
</main>

<style>
  .list-item {
    margin-top: 10px;
  }
  main {
    display: flex;
  }
  .details-container {
    padding: 10px;
    margin-left: 20px;
    margin-top: 20px;
    border: 1px solid white;
    min-width: 300px;
  }
</style>
