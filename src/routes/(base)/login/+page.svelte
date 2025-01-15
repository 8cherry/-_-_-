<script lang="ts">
	import authStore from '$modules/auth/index.svelte';
	import {redirect} from "@sveltejs/kit";
	import {goto} from "$app/navigation";
	import {doRegistrate} from "$features/registration";

	let form = $state(0);

	const onRegister = (event: SubmitEvent) => {
		event.preventDefault();


		const form: HTMLFormElement = event.target as HTMLFormElement;



		let email = form['email'].value;
		let name = form['name'].value;
		let password = form['password'].value;

		let body = {
			email,
			name,
			password,
		};

		console.log(body)
		doRegistrate(body);
	}


	const onLogin = (event: SubmitEvent) => {
		event.preventDefault();

		const form: HTMLFormElement = event.target as HTMLFormElement;

		let email = form['email'].value;
		let password = form['password'].value;

		let body = {
			email,
			password,
		};

		authStore.doLogin(body).then(() => {
			goto('/');
		});
	}

</script>


<svelte:head>
	<title>About</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div>
	{#if form == 0}
		<form class="container card form" id="login-form" action="/login" method="post" onsubmit={onLogin}>
			<h2 id="auth">Авторизация </h2>


			<input type="email" placeholder="Введите ваш E-mail:" id="email" name="email" required>
			<input type="password" placeholder="Введите ваш пароль:" id="password" name="password" required>

			<button type="submit" id="a">Войти</button>
			<p>
				<a  onclick={form = 1}>
					Еще не зарегистрированы?
				</a>
			</p>
		</form>
	{:else }
		<div class="container card form" id="registrationForm">
			<h2 id="reg">Регистрация</h2>
			<form id="register-form" action="/register" method="post" onsubmit={onRegister}>

				<input type="email" placeholder="Введите ваш E-mail:" id="reg_email" name="email" required>
				<input type="text" placeholder="Введите ваше имя:" id="reg_name" name="name" required>
				<input type="password" placeholder="Введите ваш пароль:" id="reg_password" name="password" required>

				<button type="submit" id="r">Зарегистрироваться</button>
				<p>
					<a onclick={form = 0}>Уже зарегистрированы?</a>
				</p>
			</form>
		</div>
	{/if}
</div>


<style>

	@import url('https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&family=Lato:ital,wght@0,100;0,300;0,400;0,700;0,900;1,100;1,300;1,400;1,700;1,900&display=swap');

	:root {
		--color-green: #8FE5BE;
		--color-lite-blue: #1CCAFD;
		--color-fiolet: #BE8FE5;
		--color-pink: #FB97A3;
		--color-jellow: #FCB55E;
		--color-blue: #141625;
	}

	a {
		font-family: "Lato", sans-serif;
		color: inherit;
		text-decoration: none;
	}

	input {
		background: transparent;
		border: 1px solid;
		overflow: unset;
	}

	input:focus {
		overflow: hidden;
	}

	body {
		background-color: var(--color-blue);
		display: block;
		font-family: "Lato", sans-serif;
		font-size: 18px;
	}

	.container {
		max-width: 1200px;
		padding: 0 20px;
		box-sizing: content-box;
		margin: auto;
	}

	.card {
		border: var(--color-fiolet) solid 4px;
	}

	.form {
		color: var(--color-jellow);
		text-align: center;
		max-width: 500px;
	}

	#auth, #showRegistration {
		font-family: "Lato", sans-serif;
		color: var(--color-jellow);
	}

	#reg, #showLogin {
		font-family: "Lato", sans-serif;
		color: var(--color-green);
	}

	#email, #password {
		width: 400px;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid var(--color-pink);
		box-sizing: border-box;
		color: var(--color-pink);
	}

	#email::placeholder, #password::placeholder {
		/* width: 400px; */
		/* padding: 10px;
        margin-bottom: 15px;
        border: 1px solid var(--color-pink);
        box-sizing: border-box; */
		color: var(--color-pink);
	}

	#reg_email, #reg_name, #reg_password {
		width: 400px;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid var(--color-lite-blue);
		box-sizing: border-box;
		color: var(--color-lite-blue);
	}

	#reg_email::placeholder, #reg_name::placeholder, #reg_password::placeholder {
		color: var(--color-lite-blue);
	}

	#a {
		background-color: var(--color-jellow);
		color: var(--color-blue);
		width: 177px;
		height: 44px;
		border: none;
		margin-top: 28px;
		margin-bottom: 21px;
		font-family: "Lato", sans-serif;
		font-size: 16px;
	}

	#r {
		background-color: var(--color-green);
		color: var(--color-blue);
		width: 177px;
		height: 44px;
		border: none;
		margin-top: 28px;
		margin-bottom: 21px;
		font-family: "Lato", sans-serif;
		font-size: 16px;
	}

	.hidden {
		display: none;
	}

	nav {
		width: 100%;
		display: flex;
	}

	nav img {
		margin: auto;
		padding-top: 62px;
		padding-bottom: 51px;
	}

	#reg, #auth {
		font-family: "Lato", sans-serif;
		font-weight: 400;
		font-size: 24px;
		margin-bottom: 50px;
		margin-top: 50px;
	}
</style>

