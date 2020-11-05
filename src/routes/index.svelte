<script>
  import Link from '../components/Link.svelte';
  
  const emailAddress = 'hey@alextorres.me';
  const emailSubject = 'Hey Alex! 🥝';
  const emailBody =
    'Hi Alex, I am {YOUR_NAME}, I want to talk to you about something [...].';

  const mailto = `mailto:${emailAddress}?subject=${emailSubject}&body=${emailBody}`;
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
      Currently working at my own stuff, crafting new and exciting ideas.
    </p>
    <p>In my spare time I love bikes [🚲] and mountains [⛰].</p>
    <p>
      You can find me in <Link url='https://www.linkedin.com/in/alejandrotorresm/' color='rgba(0, 119, 181, .5)' text="LinkedIn"/> and <Link url='https://github.com/AlexRex' color='rgba(36, 41, 45, .5)' text="Github"/>.
      
      I write in <Link url='/til' color='rgba(255, 237, 13, 1)' text="TIL"/> and take pictures in <Link url='/photos' color='rgba(208, 13, 255, 0.5)' text="photos"/>.
    </p>

    <p>
      Contact me at <Link url={mailto} color="rgba(174, 204, 199, 1)" text={emailAddress} />
    </p>
  </div>
</div>
