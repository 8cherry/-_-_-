<script lang="ts">
	import TransactionList from "$features/TransacrtionList/TransactionList.svelte";
	import {getExpensesCategories, getIncomeCategories, type TCategory} from "$entities/category";
	import {createAccount, getAccounts, type TAccount} from "$entities/account";
	import {getTransactions} from "$entities/transaction";

	let formTransaction = $state(1);


	let accounts = $state<Array<TAccount>>([]);

	getAccounts().then(res => {
		accounts = res;
	})

	let newAccounts = $state<Array<TAccount>>([]);

	const addAccount = () => {
		newAccounts.push({
			type: 1,
			name: '',
			amount: '',
		});
	}

	let history = $state([]);

	getTransactions().then(res => {
		history = res;
	});


	const saveNewAccount = async (index) => {
		let account = newAccounts.splice(index, 1);
		//todo save new accounts

		createAccount(account);
	}

	let incomingCategories: Array<TCategory> = $state([])
	let expenseCategories: Array<TCategory> = $state([])

	getIncomeCategories().then((res) => {
		incomingCategories = res;
	})

	getExpensesCategories().then((res) => {
		expenseCategories = res;
	})

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
		{#each newAccounts as account, index}
			<form onsubmit={() => saveNewAccount(index)}>
				<input type="text" placeholder="Название" name="name" bind:value={account.name}/>
				<input type="text" placeholder="Сумма на момент создания" name="amount" bind:value={account.amount}/>
				<button type="submit" id="dobi">
					Добавить
				</button>
			</form>
		{/each}

		<ul class="accounts--list">
			{#each accounts as account}
				<li value="{account.id}">
					{account.name}
				</li>
			{/each}
		</ul>
	</aside>
	<div class="home__main">
		<section class="card add-transaction card-green color-fiolet">
			<h2>
				Добавление транзакции
			</h2>
			<div>
				<button  class={{'btn-active': formTransaction == 1, "doh": true }} onclick={formTransaction = 1}>Доход</button>
				<button  onclick={formTransaction = 2} class={{'btn-active': formTransaction == 2, "rash": true }} >Расход</button>

				{#if formTransaction == 1}
					<form action="" method="post" class="dohod-form">
						<input type="text" placeholder="Введите сумму" name="sum">
						<select id="select-accounts" name="account">
							{#each accounts as account}
								<option value="{account.id}">
									{account.name}
								</option>
							{/each}
						</select>
						<select id="select-category" name="category">
							{#each incomingCategories as category}
								<option value={category.id}>{category.name}</option>
							{/each}
						</select>
						<button id="vnesenie" type="submit">Пополнить</button>
					</form>
				{:else}
					<form action="" method="post" class="dohod-form">
						<input type="text" placeholder="Введите сумму" name="sum">
						<select id="select-accounts" name="account">
							{#each accounts as account}
								<option value="{account.id}">
									{account.name}
								</option>
							{/each}
						</select>
						<select id="select-category" name="category">
							{#each expenseCategories as category}
								<option value={category.id}>{category.name}</option>
							{/each}
						</select>
						<button id="vnesenie" type="submit">Внести</button>
					</form>
				{/if}
		</section>
		<section class="card card-pink color-yellow transactions">
			<h2>
				История транзакций
			</h2>
			<TransactionList list={history}></TransactionList>

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

	.btn-active {
		background-color: var(--color-fiolet);
		color: black;
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

