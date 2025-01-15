<script lang="ts">
	import Header from '../Header.svelte';

	let {children} = $props();

</script>

<div class="wrapper">
	<Header/>
	<main>
		{@render children()}
	</main>
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
