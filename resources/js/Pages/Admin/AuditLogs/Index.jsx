import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';

function formatDate(dateString) {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleString('id-ID', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    });
}

function truncateText(text, maxLength = 50) {
    if (!text) return '-';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
}

export default function AuditLogsIndex({ logs, filters, assets, users, actionTypes, resultTypes }) {
    const [filterValues, setFilterValues] = useState({
        ip_address: filters.ip_address || '',
        action: filters.action || '',
        result: filters.result || '',
        is_suspicious: filters.is_suspicious || false,
        asset_id: filters.asset_id || '',
        user_id: filters.user_id || '',
        from_date: filters.from_date || '',
        to_date: filters.to_date || '',
    });

    const handleFilterChange = (key, value) => {
        setFilterValues(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        const params = {};
        Object.entries(filterValues).forEach(([key, value]) => {
            if (value !== '' && value !== false) {
                params[key] = value;
            }
        });
        router.get(route('admin.audit-logs.index'), params, { preserveState: true });
    };

    const clearFilters = () => {
        setFilterValues({
            ip_address: '',
            action: '',
            result: '',
            is_suspicious: false,
            asset_id: '',
            user_id: '',
            from_date: '',
            to_date: '',
        });
        router.get(route('admin.audit-logs.index'));
    };

    const columns = [
        { label: 'Time' },
        { label: 'IP Address' },
        { label: 'Action' },
        { label: 'Result' },
        { label: 'Asset' },
        { label: 'User' },
        { label: 'Details' },
    ];

    const getResultBadgeClass = (result) => {
        switch (result) {
            case 'success':
                return 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20';
            case 'failed':
                return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            case 'blocked':
                return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            default:
                return 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400';
        }
    };

    const renderRow = (log) => (
        <tr key={log.id} className={`hover:bg-gray-50 dark:hover:bg-slate-800/50 ${log.is_suspicious ? 'bg-red-50 dark:bg-red-900/10' : ''}`}>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400 whitespace-nowrap">
                {formatDate(log.created_at)}
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-gray-900 dark:text-white">{log.ip_address}</span>
                    {log.is_suspicious && (
                        <span className="inline-flex px-1.5 py-0.5 text-xs font-medium rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                            ⚠️
                        </span>
                    )}
                </div>
            </td>
            <td className="px-4 py-3">
                <span className="text-sm text-gray-900 dark:text-white">
                    {actionTypes[log.action] || log.action}
                </span>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getResultBadgeClass(log.result)}`}>
                    {resultTypes[log.result] || log.result}
                </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {log.asset?.title || '-'}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {log.user?.name || 'Guest'}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {log.details ? truncateText(JSON.stringify(log.details)) : '-'}
            </td>
        </tr>
    );

    const emptyState = (
        <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Tidak ada log</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Belum ada aktivitas download yang tercatat.</p>
        </div>
    );

    return (
        <AdminLayout title="Audit Logs">
            <Head title="Audit Logs" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Monitor aktivitas download dan keamanan</p>
                <Button href={route('admin.audit-logs.flagged')} variant="secondary" size="sm">
                    View Flagged Activities
                </Button>
            </div>

            {/* Filters */}
            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 mb-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">IP Address</label>
                        <input
                            type="text"
                            value={filterValues.ip_address}
                            onChange={(e) => handleFilterChange('ip_address', e.target.value)}
                            placeholder="Filter by IP"
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Action</label>
                        <select
                            value={filterValues.action}
                            onChange={(e) => handleFilterChange('action', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-transparent"
                        >
                            <option value="">All Actions</option>
                            {Object.entries(actionTypes).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Result</label>
                        <select
                            value={filterValues.result}
                            onChange={(e) => handleFilterChange('result', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-transparent"
                        >
                            <option value="">All Results</option>
                            {Object.entries(resultTypes).map(([key, label]) => (
                                <option key={key} value={key}>{label}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">Asset</label>
                        <select
                            value={filterValues.asset_id}
                            onChange={(e) => handleFilterChange('asset_id', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-transparent"
                        >
                            <option value="">All Assets</option>
                            {assets.map((asset) => (
                                <option key={asset.id} value={asset.id}>{asset.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">User</label>
                        <select
                            value={filterValues.user_id}
                            onChange={(e) => handleFilterChange('user_id', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-transparent"
                        >
                            <option value="">All Users</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>{user.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">From Date</label>
                        <input
                            type="date"
                            value={filterValues.from_date}
                            onChange={(e) => handleFilterChange('from_date', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-transparent"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-medium text-gray-700 dark:text-slate-300 mb-1">To Date</label>
                        <input
                            type="date"
                            value={filterValues.to_date}
                            onChange={(e) => handleFilterChange('to_date', e.target.value)}
                            className="w-full px-3 py-2 text-sm border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-transparent"
                        />
                    </div>
                    <div className="flex items-end gap-2">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={filterValues.is_suspicious}
                                onChange={(e) => handleFilterChange('is_suspicious', e.target.checked)}
                                className="w-4 h-4 text-[#10a37f] border-gray-300 rounded focus:ring-[#10a37f]"
                            />
                            <span className="text-sm text-gray-700 dark:text-slate-300">Suspicious Only</span>
                        </label>
                    </div>
                </div>
                <div className="flex justify-end gap-2 mt-4">
                    <Button variant="secondary" size="sm" onClick={clearFilters}>
                        Clear
                    </Button>
                    <Button size="sm" onClick={applyFilters}>
                        Apply Filters
                    </Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={logs}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
