<script>
  export let url;
  export let color;

  export let text;
</script>

<style>
  a {
    text-decoration: none;
    color: inherit;
    position: relative;
  }

  a:before {
    content: var(--theme-content);
    color: rgba(0, 0, 0, 0);
    position: absolute;
    bottom: -10px;
    height: 50%;
    background-color: var(--theme-color);
    opacity: 0;
    transform: skew(-10deg);
    z-index: -1;
  }

  a:hover:before {
    bottom: 0px;
    transition: 250ms ease-in;
    opacity: 1;
  }
</style>

<a style="--theme-color: {color}; --theme-content: {`"${text}"`}" href={url}>{text}</a>
