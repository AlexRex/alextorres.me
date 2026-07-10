<script>
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';
</script>

<style>
	main {
		min-height: calc(100% - 150px);
	}
</style>

<Nav/>

<main>
	<slot></slot>
</main>

<Footer/>
