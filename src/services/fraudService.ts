
import { SecurityAlert } from '../types';

export const getSecurityAlerts = async (): Promise<SecurityAlert[]> => {
    // Simulating API call for Proactive Fraud Monitoring
    return [
        { id: 1, type: 'warning', msg: 'New login detected in London', time: '10m ago' },
        { id: 2, type: 'info', msg: 'Your account is secure', time: '2h ago' }
    ];
};
