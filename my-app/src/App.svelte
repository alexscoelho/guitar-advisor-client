<script>
  import { onMount } from 'svelte';
  let guitars = []
  let guitar;
  let price= ""
  let name= ""
  let brand= ""
  let description= ""
  let manufacturerCountry= ""
  let imageUrl= ""

  onMount(async () => {
    const res = await fetch('https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/')
    guitars = await res.json()
  })

  async function getGuitar (id) {
    const res = await fetch(`https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/${id}`)
    guitar = await res.json()
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
    console.log(guitarCreated)
    guitars = [...guitars, guitarCreated];

  }
</script>

<form on:submit|preventDefault={createGuitar}>
  <label for="name">Name</label><br>
  <input bind:value={name} /><br>

  <label for="brand">Brand</label><br>
  <input bind:value={brand} /><br>

  <label for="price">Price</label><br>
  <input bind:value={price} /><br>

  <label for="manufacturerCountry">Manufacturer Country</label><br>
  <input bind:value={manufacturerCountry} /><br>

  <label for="imageUrl">Image Url</label><br>
  <input bind:value={imageUrl} /><br>

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

    <div>
      
    </div>
</main>

<style>
  .list-item {
    margin-top: 10px;
  }
  main {
    display: flex;
  }
</style>
