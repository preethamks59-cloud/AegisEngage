import React, { useEffect, useState } from 'react';
import { ShieldAlert } from 'lucide-react';
import { getSecurityAlerts } from '../services/fraudService';
import { SecurityAlert } from '../types';

export default function SecurityNotifications() {
    const [alerts, setAlerts] = useState<SecurityAlert[]>([]);

    useEffect(() => {
        getSecurityAlerts().then(setAlerts);
    }, []);

    return (
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden p-6 mt-6">
            <h2 className="font-bold text-slate-800 text-lg mb-4 flex items-center gap-2">
                <ShieldAlert className="text-red-500" size={20} /> Security Notifications
            </h2>
            <div className="space-y-4">
                {alerts.map(alert => (
                    <div key={alert.id} className="flex gap-3 text-sm p-3 bg-red-50 rounded-xl">
                        <ShieldAlert className={alert.type === 'warning' ? 'text-red-600' : 'text-blue-600'} size={18} />
                        <div className="text-slate-800">
                            <p className="font-medium">{alert.msg}</p>
                            <p className="text-xs text-slate-500">{alert.time}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
