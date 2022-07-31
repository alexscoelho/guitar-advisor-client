<script>
    export let name = ""
    export let brand = ""
    export let price="";
    export let description="";
    export let manufacturerCountry= "";
    export let imageUrl = "";
    export let guitars = [];
    
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
    const guitarCreated = await res.json()
    
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
    
    <style>
    
    </style>
    