<script lang="ts">

	type TAccount = {
		name: string;
		amount: number;
	};

	const accounts = $state<Array<TAccount>>([]);

	let newAccounts = $state<Array<TAccount>>([]);

	const addAccount = () => {
		newAccounts.push({
			name: '',
			amount: 0
		});
	}


	const createAccount = () => {

	}
</script>

<svelte:head>
	<title>Home</title>
	<meta name="description" content="Svelte demo app" />
</svelte:head>

<div class="home container">
	<aside class="home__aside accounts card card-blue color-green">
		<div class="accounts-title">
			<h2>Мои счета</h2>
			<span id="openForm" onclick={addAccount}>
               +
            </span>
		</div>
		{#each newAccounts as account}
			<form onsubmit={createAccount()}>
				<input type="text" placeholder="Название" name="name" bind:value={account.name}/>
				<input type="text" placeholder="Сумма на момент создания" name="amount" bind:value={account.amount}/>
				<button type="submit" id="dobi">
					Добавить
				</button>
			</form>
		{/each}

		<ul class="accounts--list">
		</ul>
	</aside>
	<div class="home__main">
		<section class="card add-transaction card-green color-fiolet">
			<h2>
				Добавление транзакции
			</h2>
			<div>
				<label>
					<button class="doh">Доход</button>
					<input type="radio" class="hidden" id="r1" name="type" value='1'>
				</label>
				<label>
					<button class="rash">Расход</button>
					<input type="radio" name="type" id="r2" value='2' class="hidden">
				</label>
			</div>
			<form action="" method="post" class="dohod-form">
				<input type="text" placeholder="Введите сумму" name="sum">
				<select id="select-accounts" name="account"></select>
				<select id="select-category" name="category">
					<option value="1">Заработная плата</option>
					<option value="2">Хобби</option>
					<option value="3">Продажа</option>
				</select><br>
				<button id="vnesenie" type="submit">Внести</button>
			</form>

		</section>
		<section class="card card-pink color-yellow transactions">
			<h2>
				История транзакций
			</h2>
			<div class="transactions--list">

			</div>

		</section>
	</div>
</div>


<style>

	h1 {
		width: 100%;
	}

	h2 {
		font-family: "Lato", sans-serif;
		font-weight: 400;
		font-size: 20px;
		margin-bottom: 22px;
	}

	.transaction {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	button {
		margin-bottom: 20px;
		color: var(--color-fiolet);
		border-color: var(--color-fiolet);
		width: 80px;
		margin-right: 10px;
	}

	#vnesenie {
		margin-top: 20px;
		color: var(--color-blue);
		background: var(--color-fiolet);
		width: 120px;
	}

	#dobi {
		color: var(--color-blue);
		background: var(--color-green);
		width: 120px;
	}

	.home {
		display: flex;
		flex-direction: row;
		column-gap: 20px;
		align-items: self-start;

	}

	.home__aside {
		width: 30%;
	}

	.home__main {
		width: 100%;
		display: flex;
		flex-direction: column;
		row-gap: 20px;
	}

	.accounts {
		display: flex;
		flex-direction: column;
		row-gap: 10px;
	}

	.accounts-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		/* margin-bottom: 20px; */
		justify-content: space-between;
	}

	.accounts--list {
		list-style: none;
		margin: 0;
		padding: 0;
		display: flex;
		flex-direction: column;
		row-gap: 5px;
	}

	.accounts--list li {
		display: flex;
		justify-content: space-between;
	}


	.add-transaction {
		display: flex;
		flex-direction: column;
	}

	#openForm {
		margin-bottom: 20px;
	}
</style>

