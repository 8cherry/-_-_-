export type TCategory = {
    id: string;
    name: string;
};

const createCategory = async (data) => {

}


const getCategory = async (id: string) => {

}

const getCategories = async (id: string) => {

}


export async function getIncomeCategories() {

    return [
        {
            id: 1,
            name: 'Заработная плата'
        },
        {
            id: 2,
            name: 'Хобби',
        },
        {
            id: 3,
            name: 'Продажа',
        },
    ]
}




export async function getExpensesCategories() {

    return [
        {
            id: 1,
            name: 'Питание'
        },
        {
            id: 2,
            name: 'Транспорт',
        },
        {
            id: 3,
            name: 'Здоровье',
        },
        {
            id: 4,
            name: 'Красота',
        },
        {
            id: 5,
            name: 'Услуги',
        },
        {
            id: 6,
            name: 'Развлечения',
        },
        {
            id: 7,
            name: 'Одежда и обувь',
        },
        {
            id: 8,
            name: 'Образование и развитие',
        },
        {
            id: 8,
            name: 'Благотворительность и подарки',
        },
    ]
}
