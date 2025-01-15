<script lang="ts">
	import { page } from '$app/state';
	import logo from '$lib/images/mini-logo.png';
	import sinein from "$lib/images/signin.png";
	import userLogo  from "$lib/images/user.png";
	import NavigationLink from "./NavigationLink.svelte";
	import authStore from "$modules/auth/index.svelte";
	import {goto} from "$app/navigation";




	const onLogout = () => {
		Promise.resolve(authStore.doLogout()).then(() => {
			goto(`/login`)
		});
	}

</script>

<header class="site-header">
	<nav class="navbar container">
		<div class="navbar-logo">
			<img src={logo} width="119px" height="46px"/>
		</div>
		<ul class="navbar__navigation">
			<NavigationLink path="/" name="Главная"></NavigationLink>
			<NavigationLink path="/transactions" name="Операции"></NavigationLink>
			<NavigationLink path="/goals" name="Цели"></NavigationLink>
			<NavigationLink path="/analize" name="Анализ"></NavigationLink>
		</ul>
		<ul class="navbar__buttons">
			<li>
				<img src={userLogo} width="35" height="35">
			</li>
			<li onclick={onLogout}>
				<img src={sinein} width="35" height="35">
			</li>
		</ul>
	</nav>
</header>


<style>



	svg {
		width: 2em;
		height: 3em;
		display: block;
	}

	path {
		fill: var(--background);
	}

	.navbar__navigation {
		column-gap: 10px;
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: space-between;
		align-items: center;
		list-style: none;
		width: 35%;
		background: var(--background);
		background-size: contain;
	}
	ul {
		position: relative;
		padding: 0;
		margin: 0;
		height: 3em;
		display: flex;
		justify-content: center;
		align-items: center;
		list-style: none;
		background: var(--background);
		background-size: contain;
	}


</style>
