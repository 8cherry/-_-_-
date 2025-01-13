<script lang="ts">
    import TransactionList from "$features/TransacrtionList/TransactionList.svelte";
    import {getTransactions} from "$entities/transaction";

    let history = []


    getTransactions().then(res => {
        history = res;
    });

</script>

<div class="card transaction-history card-yellow container">
    <div class="transaction-history--head">
        <h2 class="transaction-history--head_title">
            История транзакций
        </h2>
        <div class="transaction-history--head_searchBox">
            <select name="" id="">

            </select>
            <select name="" id="">

            </select>
            <select name="" id=""></select>
        </div>

    </div>
    <div>
        <TransactionList list={history}></TransactionList>
    </div>
</div>


<style>
    .transaction-history {

    }
    .transaction-history--head {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
    }
    .transaction-history--head_searchBox {

    }
</style>
