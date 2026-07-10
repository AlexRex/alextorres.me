<script>
	import { browser } from '$app/environment';
	import { afterNavigate } from '$app/navigation';
	import { Tracka } from '@alextorresrex/tracka-client';
	import Nav from '../components/Nav.svelte';
	import Footer from '../components/Footer.svelte';

	const tracka = browser ? new Tracka({ site: 'alextorres.me' }) : null;

	afterNavigate(({ from, to }) => {
		tracka
			?.pageview(to?.url.pathname ?? location.pathname, from?.url.href ?? document.referrer)
			.catch(() => {});
	});
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
