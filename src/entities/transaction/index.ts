
export type TTransaction = {
    date: string,
    amount: string,
    account: string,
    category: string,
    type: 1 | 2,
}

export const createTransaction = async (data) => {

}


export const getTransaction = async (id: string) => {

}

export const getTransactions = async () => {

    return [
        {
            date: '2014-01-01 15:32:12',
            amount: '10000',
            account: 'Карта',
            category: 'Зарплата',
            type: 1,
        },
        {
            date: '2014-01-02 15:32:12',
            amount: '2000',
            account: 'Наличные',
            category: 'Питание',
            type: 2,
        }
    ]
}



