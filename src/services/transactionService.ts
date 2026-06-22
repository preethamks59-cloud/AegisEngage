
import { Transaction } from '../types';

export const getRecentTransactions = async (): Promise<Transaction[]> => {
    // Simulating API call for transactions
    return [
        { id: 1, desc: 'Amazon India', amount: '-₹2,999', date: 'Today, 08:30 AM', status: 'Completed' },
        { id: 2, desc: 'SBI Salary Credit', amount: '+₹85,000', date: 'Yesterday, 10:00 AM', status: 'Completed' },
    ];
};
