import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import { Head, Link } from '@inertiajs/react';

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

export default function AuditLogsFlagged({ logs, suspiciousIps }) {
    const columns = [
        { label: 'Time' },
        { label: 'IP Address' },
        { label: 'Action' },
        { label: 'Result' },
        { label: 'Asset' },
        { label: 'User' },
        { label: 'Details' },
    ];

    const actionLabels = {
        'code_attempt': 'Code Attempt',
        'code_success': 'Code Success',
        'download_request': 'Download Request',
        'download_complete': 'Download Complete',
        'code_generation': 'Code Generation',
        'code_export': 'Code Export',
    };

    const resultLabels = {
        'success': 'Success',
        'failed': 'Failed',
        'blocked': 'Blocked',
    };

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
        <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 bg-red-50 dark:bg-red-900/10">
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400 whitespace-nowrap">
                {formatDate(log.created_at)}
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-mono text-gray-900 dark:text-white">{log.ip_address}</span>
                    <span className="inline-flex px-1.5 py-0.5 text-xs font-medium rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                        ⚠️
                    </span>
                </div>
            </td>
            <td className="px-4 py-3">
                <span className="text-sm text-gray-900 dark:text-white">
                    {actionLabels[log.action] || log.action}
                </span>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${getResultBadgeClass(log.result)}`}>
                    {resultLabels[log.result] || log.result}
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
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Tidak ada aktivitas mencurigakan</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Semua aktivitas download terlihat normal.</p>
        </div>
    );

    return (
        <AdminLayout title="Flagged Activities">
            <Head title="Flagged Activities" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Aktivitas yang ditandai mencurigakan dalam 24 jam terakhir</p>
                <Button href={route('admin.audit-logs.index')} variant="secondary" size="sm">
                    View All Logs
                </Button>
            </div>

            {/* Suspicious IPs Summary */}
            {suspiciousIps && suspiciousIps.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800 p-4 mb-4">
                    <h3 className="text-sm font-semibold text-red-800 dark:text-red-300 mb-3 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        IP Addresses dengan Aktivitas Mencurigakan
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {suspiciousIps.map((ip, index) => (
                            <div key={index} className="bg-white dark:bg-slate-800 rounded-lg p-3 border border-red-100 dark:border-red-900">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-mono text-gray-900 dark:text-white">{ip.ip_address}</span>
                                    <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400">
                                        {ip.attempt_count} attempts
                                    </span>
                                </div>
                                <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">
                                    Last: {formatDate(ip.last_attempt)}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <DataTable
                columns={columns}
                data={logs}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
