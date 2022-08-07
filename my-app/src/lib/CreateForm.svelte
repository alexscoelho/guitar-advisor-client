<script>
  import { guitars } from "../stores.js";
  export let name = "";
  export let brand = "";
  export let price = "";
  export let description = "";
  export let manufacturerCountry = "";
  export let imageUrl;
  let imageFile;

  const onFileSelected = async (e) => {
    let data = new FormData();
    data.append("file", e.target.files[0]);
    uploadImage(data);
  };

  async function uploadImage(data) {
    const res = await fetch(
      "https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/token/",
      {
        method: "POST",
        body: data,
      }
    );
    data = await res.json();
    imageUrl = data.secure_url;
  }

  async function createGuitar() {
    let data = {
      price,
      name,
      brand,
      description,
      manufacturer_country: manufacturerCountry,
      image_url: imageUrl,
    };
    const res = await fetch(
      "https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/guitars/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
    const guitarCreated = await res.json();
    let updated = [...$guitars, guitarCreated];
    guitars.set(updated);
  }
</script>

<form on:submit|preventDefault={createGuitar}>
  <label for="name">Name</label><br />
  <input type="text" bind:value={name} /><br />

  <label for="brand">Brand</label><br />
  <input type="text" bind:value={brand} /><br />

  <label for="price">Price</label><br />
  <input type="text" bind:value={price} /><br />

  <label for="manufacturerCountry">Manufacturer Country</label><br />
  <input type="text" bind:value={manufacturerCountry} /><br />

  <label for="image">Upload Image</label><br />
  <input
    on:change={(e) => onFileSelected(e)}
    type="file"
    id="image"
    name="image"
    bind:value={imageFile}
  /><br />

  <label for="description">Description</label><br />
  <textarea bind:value={description} rows="4" cols="50" /><br />

  <button type="submit">Create</button>
</form>

<style>
</style>
