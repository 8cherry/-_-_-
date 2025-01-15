export type TAccount = {
    id?: string | number;
    type: number;
    name: string;
    amount: number | string;
};

export const createAccount = async (data) => {

}


export const getAccount = async (id: string) => {

}

export const getAccounts = async (): Promise<Array<TAccount>> => {

}
