<svelte:options customElements="goalForm" />
<script>
import DatePicker from "$shared/DatePicker.svelte";

function dispatch(type, options=null) {
    $host().dispatchEvent(new CustomEvent(type, options))
}

const form = $state({
    startDate: '',
    endDate: '',
    name: '',
    amount: '',
});

const onSave = () => {
    dispatch('save');
}

</script>

<form action="" onsubmit={onSave}>
    <div class="goal-form">
        <div class="goal-form--row">
            <input type="text" placeholder="Название" bind:value={form.name}>
            <DatePicker bind:value={form.startDate}></DatePicker>
        </div>
        <div class="goal-form--row">
            <input type="text" placeholder="Сумма" bind:value={form.amount}>
            <DatePicker bind:value={form.startDate}></DatePicker>
        </div>
    </div>

    <button>
        Добавить цель
    </button>
</form>
