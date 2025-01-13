<script lang="ts">
    import Chart from 'chart.js/auto';
    import type {Action} from "svelte/action";
    import TransactionList from "$features/TransacrtionList/TransactionList.svelte";
    import {getTransactions} from "$entities/transaction";
    import DatePicker from "$shared/DatePicker.svelte";

    let formTransaction = $state(1);


    let history = $state([])

    getTransactions().then(res => {
        history = res;
    });

    const data = [
        { year: 2024, mounth: 5, count: 10000 },
        { year: 2024, mounth: 6, count: 55000 },
        { year: 2024, mounth: 7, count: 100000 },
        { year: 2024, mounth: 8, count: 40000 },
        { year: 2024, mounth: 9, count: 60000 },
        { year: 2024, mounth: 10, count: 80000 },
        { year: 2024, mounth: 11, count: 70000 },
    ];

    const renderChartSource: Action = (node) => {
        new Chart(
            node,
            {
                type: 'pie',
                data: {
                    labels: ['Продажа', 'Хобби', 'ЗП'],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: [10, 20, 70],
                        }
                    ]
                }
            }
        );
    }

    const renderChartRatio: Action = (node) => {
        new Chart(
            node,
            {
                type: 'pie',
                data: {
                    labels: ['Расходы', 'Доходы'],
                    datasets: [
                        {
                            label: 'Dataset 1',
                            data: [40, 60],
                        }
                    ]
                }
            }
        );
    }

    const renderChart: Action = (node) => {
        new Chart(
            node,
            {
                type: 'bar',
                data: {
                    labels: data.map(row => row.year + '.'+ row.mounth),
                    datasets: [
                        {
                            label: 'Доходы',
                            backgroundColor:'#8FE5BE',
                            data: data.map(row => row.count )
                        }
                    ]
                }
            }
        );
    }
</script>
<div class="container">
    <div style="margin-bottom: 2rem">
        <button  class={{'btn-active': formTransaction == 1, "doh": true }} onclick={formTransaction = 1}>Доход</button>
        <button  onclick={formTransaction = 2} class={{'btn-active': formTransaction == 2, "rash": true }} >Расход</button>
        <DatePicker ></DatePicker>
    </div>
    <div class="card card-green color-fiolet ">
        <h3>
            Динамика доходов
        </h3>
        <canvas id="acquisitions" use:renderChart></canvas>
    </div>

    <div class="second-screen row">
        <div class="second-screen-card card card-pink">
            <TransactionList list={history}>

            </TransactionList>
        </div>
        <div class="second-screen-card card card-pink">
            <h4>
                Источники дохода
            </h4>
            <canvas id="two" use:renderChartSource></canvas>
            <h4>
                Соотношение доходов и расходов
            </h4>
            <canvas id="three" use:renderChartRatio></canvas>

        </div>
    </div>
</div>

<style>

    .btn-active {
        background-color: var(--color-fiolet);
        color: black;
    }

    h3 {
        margin-top: 0;
    }
    .second-screen {
        margin-top: 2rem;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: baseline;
        column-gap: 2rem;
    }
    .second-screen-card {
        width: 50%;
    }
</style>
