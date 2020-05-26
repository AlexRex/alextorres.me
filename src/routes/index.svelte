<script>
	import Link from '../components/Link.svelte';
</script>
<style>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 150px);
  }

  .text {
    margin: 0 30px;
    max-width: 800px;
  }

  p {
    font-size: 24px;
  }

  @media (max-width: 600px) {
		p {
    	font-size: 20px;
		}
  }
</style>

<svelte:head>
  <title>Alex Torres</title>
</svelte:head>

<div class="container">
  <div class="text">
    <p>
      I am a passionated software engineer focused on web technologies, coding and
      visual stuff.
      <br />
      Currently working at adidas, crafting new digital products.
    </p>
    <p>In my spare time I love bikes [🚲] and mountains [⛰].</p>
    <p>
      You can find me in <Link url='https://www.linkedin.com/in/alejandrotorresmateu/' color='rgba(0, 119, 181, .5)' text="LinkedIn"/> and <Link url='https://github.com/AlexRex' color='rgba(36, 41, 45, .5)' text="Github"/>.
      
      I write in <Link url='/til' color='rgba(255, 237, 13, 1)' text="TIL"/>.
    </p>
  </div>
</div>
