<script>
export let reviewBody = ""
export let numStars = ""
export let guitar;

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
  }
</script>


<form on:submit|preventDefault={createReview}>

  <label for="price">Rating</label><br>
  <input type="number" min="1" max="5" bind:value={numStars} /><br>

  <label for="reviewBody">Review Body</label><br>
  <textarea name="reviewBody" bind:value={reviewBody} cols="40" rows="10"></textarea><br>

  <button type="submit">Send Review</button>
</form>

<style>

</style>
