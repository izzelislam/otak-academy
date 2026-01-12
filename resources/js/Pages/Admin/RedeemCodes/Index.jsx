import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';

export default function RedeemCodesIndex({ redeemCodes, courses, filters }) {
    const [courseFilter, setCourseFilter] = useState(filters.course_id || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || '');

    const handleFilter = () => {
        router.get(route('admin.redeem-codes.index'), { course_id: courseFilter || undefined, status: statusFilter || undefined }, { preserveState: true, preserveScroll: true });
    };

    const handleClearFilters = () => {
        setCourseFilter('');
        setStatusFilter('');
        router.get(route('admin.redeem-codes.index'));
    };

    const handleDelete = (codeId) => confirm('Hapus kode ini?') && router.delete(route('admin.redeem-codes.destroy', codeId));
    const copyToClipboard = (code) => navigator.clipboard.writeText(code);

    const columns = [
        { label: 'Code' },
        { label: 'Course' },
        { label: 'Status' },
        { label: 'Redeemed By' },
        { label: '', align: 'right' },
    ];

    const renderRow = (code) => (
        <tr key={code.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <code className="text-xs font-mono bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded text-gray-700 dark:text-slate-300">{code.code}</code>
                    <button onClick={() => copyToClipboard(code.code)} className="p-1 text-gray-400 hover:text-[#10a37f]" title="Copy">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                    </button>
                </div>
            </td>
            <td className="px-4 py-3 text-gray-900 dark:text-white">{code.course?.title || 'N/A'}</td>
            <td className="px-4 py-3">
                <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded ${code.is_used ? 'bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400' : 'bg-[#10a37f]/10 dark:bg-[#10a37f]/20 text-[#10a37f]'}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${code.is_used ? 'bg-gray-400' : 'bg-[#10a37f]'}`}></span>
                    {code.is_used ? 'Used' : 'Available'}
                </span>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{code.user?.name || '—'}</td>
            <td className="px-4 py-3 text-right">
                {!code.is_used && (
                    <IconButton variant="danger" onClick={() => handleDelete(code.id)}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </IconButton>
                )}
            </td>
        </tr>
    );

    const emptyState = (
        <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" /></svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Belum ada kode</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Generate kode untuk memberikan akses course.</p>
            <Button href={route('admin.redeem-codes.create')} size="sm">Generate Codes</Button>
        </div>
    );

    return (
        <AdminLayout title="Redeem Codes">
            <Head title="Redeem Codes" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Kelola kode akses untuk courses</p>
                <Button href={route('admin.redeem-codes.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                    Generate Codes
                </Button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-3 mb-4">
                <div className="flex flex-wrap items-end gap-3">
                    <div className="flex-1 min-w-[150px]">
                        <label className="block text-xs font-medium text-gray-600 dark:text-slate-400 mb-1">Course</label>
                        <select className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#10a37f]" value={courseFilter} onChange={(e) => setCourseFilter(e.target.value)}>
                            <option value="">Semua Course</option>
                            {courses.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                        </select>
                    </div>
                    <div className="flex-1 min-w-[120px]">
                        <label className="block text-xs font-medium text-gray-600 dark:text-slate-400 mb-1">Status</label>
                        <select className="w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#10a37f]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="">Semua Status</option>
                            <option value="unused">Available</option>
                            <option value="used">Used</option>
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <Button onClick={handleFilter} variant="secondary" size="sm">Apply</Button>
                        {(courseFilter || statusFilter) && <button onClick={handleClearFilters} className="px-3 py-2 text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-white">Clear</button>}
                    </div>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={redeemCodes}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
