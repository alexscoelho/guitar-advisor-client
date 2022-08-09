<script>
  export let username = "";
  export let password = "";
  export let email = "";

  import { useNavigate } from "svelte-navigator";
  const navigate = useNavigate();

  async function signup() {
    const data = {
      username,
      password,
      email,
    };
    try {
      const res = await fetch(
        "https://alexscoelho-guitar-advisor-api-5w546w45c6g9-8000.githubpreview.dev/users/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (res.ok) {
        navigate("/signin");
      }
    } catch (error) {
      console.log("Something Bad Happened!");
    }
  }
</script>

<form on:submit|preventDefault={signup}>
  <label for="email">Email</label><br />
  <input type="email" bind:value={email} /><br />

  <label for="username">Username</label><br />
  <input type="text" bind:value={username} /><br />

  <label for="brand">Password</label><br />
  <input type="password" bind:value={password} /><br />

  <button type="submit">Sign Up</button>
</form>

<style>
</style>
