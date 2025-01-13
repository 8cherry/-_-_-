<script>
    import datepicker from 'js-datepicker';
    import 'js-datepicker/dist/datepicker.min.css';

    let {value = $bindable(), } = $props();


    const picker = (node) => {
        datepicker(node, {
            startDay: 1,
            customMonths: ['Январь', 'Февраль', 'Март',
                'Апрель', 'Май', 'Июнь', 'Июль', 'Август',
                'Сентябрь', 'Октябрь',
                'Ноябрь', 'Декабрь'],
            formatter: (input, date) => {
                const value = date.toLocaleDateString('Ru-ru')
                input.value = value // => '1/1/2099'
            },
            onSelect: (instance, date) => {
                value = date.toLocaleDateString('Ru-ru');
            }
        });
    }

</script>
<div>
    <input id="picker" use:picker value={value}/>
</div>
