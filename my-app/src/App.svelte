<script>
import {guitar, guitars} from './stores.js'
import { onMount, onDestroy } from 'svelte';
import CreateForm from './lib/CreateForm.svelte';
import ReviewForm from './lib/ReviewForm.svelte'
  let price= ""
  let name= ""
  let brand= ""
  let description= ""
  let manufacturerCountry= ""
  let imageUrl= ""
  let reviewBody = ""
  let numStars = ""

  // subscribe to value on stores.js and keeps tracks of changes
  let guitarValue;
  const unsubscribe = guitar.subscribe(value => {
    guitarValue = value
  })

  onDestroy(unsubscribe);

  async function getGuitars() {
    const res = await fetch('https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/')
    guitars.set(await res.json())
  }

  onMount(async () => {
    getGuitars()
  })

  async function getGuitar (id) {
    const res = await fetch(`https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/${id}`)
    guitar.set(await res.json())

  }

  async function deleteGuitar (id) {
    const res = await fetch(`https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/${id}`, {
      method: "DELETE"
    })
    await res.json()
    getGuitars()
  }

</script>

<CreateForm  name={name} brand={brand} price={price} description={description} manufacturerCountry={manufacturerCountry} imageUrl={imageUrl} />

<main>
  <div>
    <h1>Guitar Advisor</h1>
    <ul>
      {#each $guitars as {image_url,name, price,id} }
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
      {#if guitarValue !== undefined}
        <h2>{guitarValue?.name}</h2>
        <p>{guitarValue?.description}</p>
        <img src={guitarValue?.image_url} alt={guitarValue?.image_url} width="200" height="200" />
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
