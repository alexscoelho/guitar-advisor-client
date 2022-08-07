<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import SignIn from "./routes/SignIn.svelte";
</script>

<Router primary={false}>
  <nav>
    <Link to="/signup">Signup</Link>
    <Link to="/home">Home</Link>
  </nav>
  <div>
    <Route path="/signup">
      <SignIn />
    </Route>
    <Route path="/home">
      <Home />
    </Route>
  </div>
</Router>

<style>
</style>
