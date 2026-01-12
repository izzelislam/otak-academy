import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head } from '@inertiajs/react';

export default function AssetCodes({ asset, codes }) {
    const columns = [
        { label: 'Code' },
        { label: 'Status' },
        { label: 'Redeemed By' },
        { label: 'Used At' },
        { label: 'Downloads' },
        { label: 'Expires At' },
    ];

    const copyToClipboard = (code) => {
        navigator.clipboard.writeText(code);
        // Optional: Show a toast notification here
    };

    const renderRow = (code) => (
        <tr key={code.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <code className="text-xs font-mono bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-gray-700 dark:text-slate-300">
                        {code.code || code.code_prefix}
                    </code>
                    {code.code && (
                        <button onClick={() => copyToClipboard(code.code)} className="p-1 text-gray-400 hover:text-[#10a37f]" title="Copy">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                        </button>
                    )}
                </div>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${code.is_used ? 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400' : 'bg-[#10a37f]/10 dark:bg-[#10a37f]/20 text-[#10a37f]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${code.is_used ? 'bg-gray-400' : 'bg-[#10a37f]'}`}></span>
                    {code.is_used ? 'Used' : 'Available'}
                </span>
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {code.user?.name || '-'}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {code.used_at 
                    ? new Date(code.used_at).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })
                    : '-'
                }
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {code.download_count || 0} / {code.max_downloads || 3}
            </td>
            <td className="px-4 py-3 text-sm text-gray-500 dark:text-slate-400">
                {code.expires_at 
                    ? new Date(code.expires_at).toLocaleDateString('id-ID', { 
                        day: 'numeric', 
                        month: 'short', 
                        year: 'numeric'
                    })
                    : 'Never'
                }
            </td>
        </tr>
    );

    const emptyState = (
        <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                <svg className="w-6 h-6 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Belum ada kode</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400">Generate kode dari halaman detail asset.</p>
        </div>
    );

    // Calculate stats
    const items = codes?.data || codes || [];
    const totalCodes = items.length;
    const usedCodes = items.filter(c => c.is_used).length;
    const availableCodes = totalCodes - usedCodes;

    return (
        <AdminLayout title={`Codes: ${asset.title}`}>
            <Head title={`Codes - ${asset.title}`} />
            <BackLink href={route('admin.assets.show', asset.id)}>Kembali ke Asset</BackLink>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-4">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4 text-center">
                    <p className="text-2xl font-semibold text-gray-900 dark:text-white">{codes?.total || totalCodes}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Total Codes</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-[#10a37f]/30 p-4 text-center">
                    <p className="text-2xl font-semibold text-[#10a37f]">{availableCodes}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Available</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-amber-200 dark:border-amber-800 p-4 text-center">
                    <p className="text-2xl font-semibold text-amber-600 dark:text-amber-400">{usedCodes}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400">Used</p>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={codes}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
