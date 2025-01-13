<script lang="ts">
    import DatePicker from "../../../shared/DatePicker.svelte";
    import {createGoal} from "$entities/goal";


    const defaultForm = {
        startDate: '',
        endDate: '',
        name: '',
        amount: '',
    };

    let  form = $state(defaultForm);

    const fetchGoals = () => {

    }

    const onSave = (event: SubmitEvent) => {
        event.preventDefault();

        createGoal(form).then(() => {
            fetchGoals()
        })
    }
</script>

<div class="card card-pink container mb-2 color-green">
    <h2 style="margin-bottom: 20px">
        Добавление цели
    </h2>
    <form action="" onsubmit={onSave}>
        <div class="goal-form">
            <div class="goal-form--row" style="margin-bottom: 10px">
                <input type="text" placeholder="Название" bind:value={form.name}>
                <DatePicker bind:value={form.startDate}></DatePicker>
            </div>
            <div class="goal-form--row">
                <input type="text" placeholder="Сумма" bind:value={form.amount}>
                <DatePicker bind:value={form.endDate}></DatePicker>
            </div>
        </div>
        <button type="submit">
            Добавить цель
        </button>
    </form>
</div>
<div class="card goals--block color-fiolet card-yellow container">
    <h2 class="goals--block--title">Все цели</h2>
    <div class="goals--block-view">
        <div class="goals--block-view_card card color-pink card-fiolet">
            <h3>
                На отпуск
            </h3>
            <p class="color-green">
                100 /1500
            </p>
            <h4>
                До декабря 2025г
            </h4>
        </div>
    </div>
</div>


<style>
    .card-pink {
        margin-bottom: 1rem;
    }
    .goals--block--title {
        margin-bottom: 20px;
    }

    .goals--block-view {

    }

    .goals--block-view_card {
        max-width: 300px;
    }

    .goal-form {
        margin-bottom: 20px;
    }

    .goal-form--row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
    }
</style>
