<script>
  import { Router, Link, Route } from "svelte-navigator";
  import SignUp from "./routes/SignUp.svelte";
  import Home from "./routes/Home.svelte";
</script>

<Router>
  <nav>
    <Link to="/signup">Signup</Link>
    <Link to="/home">Home</Link>
  </nav>
  <div>
    <Route path="/signup">
      <SignUp />
    </Route>
    <Route path="/home">
      <Home />
    </Route>
  </div>
</Router>

<style>
</style>
