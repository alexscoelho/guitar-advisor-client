<script>
  import { Router, Link, Route } from "svelte-navigator";
  import Home from "./routes/Home.svelte";
  import SignIn from "./routes/SignIn.svelte";
  import SignUp from "./routes/SignUp.svelte";
</script>

<Router primary={false}>
  <nav>
    <Link to="/signin">SignIn</Link>
    <Link to="/signup">Signup</Link>
    <Link to="/home">Home</Link>
  </nav>
  <div>
    <Route path="/signin">
      <SignIn />
    </Route>
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
