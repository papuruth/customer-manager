export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    address: string;
    city: string;
    state: string;
    orders?: [];
    gender: string;
    orders_total?: string;
}
