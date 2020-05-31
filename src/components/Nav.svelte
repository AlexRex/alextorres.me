<script>
  import Link from "./Link.svelte";
</script>

<style>
  nav {
    display: flex;
    height: 100px;
    padding: 0 30px;
    align-items: center;
  }

  .name {
    flex: 1;
    font-size: 14px;
  }

  .links {
    display: flex;
    flex: 1;
    justify-content: flex-end;
    font-size: 14px;
  }

  h2 {
    padding: 0 20px 0 0;
  }
</style>

<nav>
  <div class="name">
    <h1>
      <Link url="/" color="rgba(166, 186, 61, 0.5)" text="alex torres" />
    </h1>
  </div>
  <div class="links">
    <h2>
      <Link url="/bio" color="rgba(254, 101, 1, 0.7)" text="bio" />
    </h2>
    <h2>
      <Link url="/til" color="rgba(255, 237, 13, 1)" text="til" />
    </h2>
    <h2>
      <Link url="/photos" color="rgba(208, 13, 255, 0.5)" text="photos" />
    </h2>
  </div>
</nav>
