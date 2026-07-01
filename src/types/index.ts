
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

export interface BankNotification {
    id: string;
    type: 'security' | 'wealth' | 'onboarding' | 'system';
    severity: 'critical' | 'warning' | 'info' | 'success';
    title: string;
    message: string;
    time: string;
    read: boolean;
    ctaText?: string;
    ctaActionMessage?: string;
}

