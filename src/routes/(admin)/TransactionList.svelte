<script lang="ts">
    type TTransaction = {
        date: string;
        amount: string;
        category: string;
        account: string;
    }

    interface Props {
        list: Array<{
            date: string;
            amount: string;
            category: string;
            account: string;
        }>;
    }

    const {list}: Props = $props();

    type t = Array<{
        date: string;
        transactions: Array<TTransaction>
    }>
    const transactionSortedList: () => t = $derived(() => {
        let date = null;
        const reslist: t = [];

        let pointerToTransactionBacket = null;

        for (let transaction of list) {

            if (date != transaction.date) {

                let formattedData = new Date(transaction.date);

                const d = `${formattedData.toLocaleString('ru-RU', {month: "long"})} ${formattedData.getDate()}`;

                date = transaction.date;

                let insertIndex = reslist.push({
                    date: d,
                    transactions: []
                })

                pointerToTransactionBacket = reslist[insertIndex - 1];
            }

            pointerToTransactionBacket.transactions.push(transaction)
        }

        return reslist;
    })

    console.log(transactionSortedList);

</script>

<div class="transactions--list">
    {#each transactionSortedList() as dates}
        <h3>
            {dates.date}
        </h3>
        {#each dates.transactions as transaction}
            <div class='transaction'>
            <span>
                Наличные
            </span>
                <span>
                Премия
            </span>
                <span class='color-green'>
               + ${transaction.amount || 0} ₽
            </span>
            </div>
        {/each}
    {/each}
</div>
