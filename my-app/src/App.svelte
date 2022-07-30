<script>
  import { onMount } from 'svelte';
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

  onMount(async () => {
    const res = await fetch('https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/')
    guitars = await res.json()
  })

  async function getGuitar (id) {
    const res = await fetch(`https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/${id}`)
    guitar = await res.json()
  }

  async function createReview () {
    let data = {
      num_stars : numStars,
      text_body: reviewBody,
      guitar_id : guitar.id,
      user_id: 1
    }
    const res = await fetch('https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/reviews/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const reviewCreated = res.json()
    console.log(reviewCreated)
  }

  async function createGuitar () {
    let data = {
      price,
      name,
      brand,
      description,
      manufacturer_country:manufacturerCountry,
      image_url:imageUrl
    }
    const res = await fetch('https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    const guitarCreated = res.json()
    guitars = [...guitars, guitarCreated];
  }

</script>

<form on:submit|preventDefault={createGuitar}>
  <label for="name">Name</label><br>
  <input type="text" bind:value={name} /><br>

  <label for="brand">Brand</label><br>
  <input type="text" bind:value={brand} /><br>

  <label for="price">Price</label><br>
  <input type="text" bind:value={price} /><br>

  <label for="manufacturerCountry">Manufacturer Country</label><br>
  <input type="text" bind:value={manufacturerCountry} /><br>

  <label for="imageUrl">Image Url</label><br>
  <input type="text" bind:value={imageUrl} /><br>

  <label for="description">Description</label><br>
  <textarea bind:value={description} rows="4" cols="50"></textarea><br>

  <button type="submit">Create</button>
</form>


<main>
  <div>
    <h1>Guitar Advisor</h1>
    <ul>
      {#each guitars as {name, price,id} }
      <li class="list-item">
        {name} - ${price}
        <button on:click={() =>getGuitar(id)}>Details</button>
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
      <ReviewForm/>
      <form on:submit|preventDefault={createReview}>

        <label for="price">Rating</label><br>
        <input type="number" min="1" max="5" bind:value={numStars} /><br>

        <label for="reviewBody">Review Body</label><br>
        <textarea name="reviewBody" bind:value={reviewBody} cols="40" rows="10"></textarea><br>

        <button type="submit">Send Review</button>
      </form>
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
