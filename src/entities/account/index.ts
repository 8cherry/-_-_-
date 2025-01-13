export type TAccount = {
    id?: string;
    type: number;
    name: string;
    amount: number | string;
};

export const createAccount = async (data) => {

}


export const getAccount = async (id: string) => {

}

export const getAccounts = async () => {
    return [
        {
            id: 1,
            name: 'Наличные',
            type: 1,
        },
        {
            id: 2,
            name: 'Банковская карта',
            type: 2,
        },
        // {
        //     id: 3,
        //
        // },
    ]
}
