<script>
  export let time;
  export let position;
  export let company;
</script>

<style>
  .entry {
    display: flex;
    justify-content: space-around;
    margin: 20px 0;
  }

  @media (max-width: 620px) {
    .entry {
      flex-direction: column;
    }
  }
  h2,
  h3 {
    margin: 0;
  }
  .time {
    display: flex;
    flex: 1;
  }
  .description {
    flex: 3;
  }

  .company {
    font-weight: 400;
  }
</style>

<div class="entry">
  <div class="time">{time}</div>
  <div class="description">
    <h2 class="position">{position}</h2>
    <h3 class="company">{company}</h3>
    <slot />
  </div>
</div>
