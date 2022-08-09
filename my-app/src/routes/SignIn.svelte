<script>
  export let username = "";
  export let password = "";
  import { token } from "../stores";
  import { onDestroy } from "svelte";

  import { useNavigate } from "svelte-navigator";
  const navigate = useNavigate();

  // subscribe to value on stores.js and keeps tracks of changes
  let accessToken;
  const unsubscribe = token.subscribe((value) => {
    accessToken = value;
  });

  onDestroy(unsubscribe);

  async function signin() {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    try {
      const res = await fetch(
        "https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/token/",
        {
          method: "POST",
          body: formData,
        }
      );
      if (res.ok) {
        const data = await res.json();
        token.set(data.access_token);
        localStorage.setItem("accessToken", data.access_token);
        navigate("/home");
      }
    } catch (error) {
      console.log("Something Bad Happened!");
    }
  }
</script>

<form on:submit|preventDefault={signin}>
  <label for="username">Username</label><br />
  <input type="text" bind:value={username} /><br />

  <label for="brand">Password</label><br />
  <input type="password" bind:value={password} /><br />

  <button type="submit">Sign In</button>
</form>

<style>
</style>
