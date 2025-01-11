
<script lang="ts">
	import logo from "$lib/images/mini-logo.png";

	let {children} = $props();


</script>

<div class="wrapper">

	<header class="site-header flex justify-center">
		<div class="navbar-logo">
			<img src={logo} width="119px" height="46px"/>
		</div>
	</header>
	<main>
		{@render children()}
	</main>

	<footer>
		<p>
			visit <a href="https://svelte.dev/docs/kit">svelte.dev/docs/kit</a> to learn about SvelteKit
		</p>
	</footer>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	main {
		flex: 1 1 auto;
	}
</style>
