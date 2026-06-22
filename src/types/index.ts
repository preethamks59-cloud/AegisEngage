
export interface SecurityAlert {
    id: number;
    type: 'warning' | 'info';
    msg: string;
    time: string;
}

export interface Transaction {
    id: number;
    desc: string;
    amount: string;
    date: string;
    status: 'Completed' | 'Pending';
}
