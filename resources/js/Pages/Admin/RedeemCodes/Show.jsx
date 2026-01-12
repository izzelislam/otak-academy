import AdminLayout from '@/Layouts/AdminLayout';
import Button from '@/Components/Button';
import { BackLink } from '@/Components/Admin/FormCard';
import { Head, Link, router } from '@inertiajs/react';

export default function RedeemCodeShow({ redeemCode }) {
    const handleDelete = () => confirm('Hapus kode ini?') && router.delete(route('admin.redeem-codes.destroy', redeemCode.id));
    const copyToClipboard = () => navigator.clipboard.writeText(redeemCode.code);

    return (
        <AdminLayout title="Detail Redeem Code">
            <Head title={`Redeem Code: ${redeemCode.code}`} />

            <div className="flex items-center justify-between mb-4">
                <BackLink href={route('admin.redeem-codes.index')}>Kembali ke Redeem Codes</BackLink>
                {!redeemCode.is_used && <Button onClick={handleDelete} variant="danger" size="sm">Hapus Kode</Button>}
            </div>

            <div className="max-w-lg">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <div className="text-center py-4 bg-gray-50 dark:bg-slate-950 rounded-lg mb-4">
                        <div className="flex items-center justify-center gap-2">
                            <code className="text-xl font-mono font-bold text-gray-900 dark:text-white">{redeemCode.code}</code>
                            <button onClick={copyToClipboard} className="p-1.5 text-gray-400 hover:text-[#10a37f] hover:bg-gray-100 dark:hover:bg-slate-800 rounded" title="Copy">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                            </button>
                        </div>
                        <span className={`inline-block mt-2 px-2 py-0.5 text-xs font-medium rounded ${redeemCode.is_used ? 'bg-gray-200 dark:bg-slate-800 text-gray-700 dark:text-slate-400' : 'bg-[#10a37f]/10 dark:bg-[#10a37f]/20 text-[#10a37f]'}`}>
                            {redeemCode.is_used ? 'Used' : 'Available'}
                        </span>
                    </div>

                    <dl className="divide-y divide-gray-100 dark:divide-slate-800 text-sm">
                        <div className="py-2.5 flex justify-between">
                            <dt className="text-gray-500 dark:text-slate-400">Course</dt>
                            <dd className="text-gray-900 dark:text-white">
                                {redeemCode.course ? <Link href={route('admin.courses.show', redeemCode.course.id)} className="text-[#10a37f] hover:underline">{redeemCode.course.title}</Link> : 'N/A'}
                            </dd>
                        </div>
                        <div className="py-2.5 flex justify-between">
                            <dt className="text-gray-500 dark:text-slate-400">Dibuat</dt>
                            <dd className="text-gray-900 dark:text-white">{new Date(redeemCode.created_at).toLocaleString('id-ID')}</dd>
                        </div>
                        {redeemCode.is_used && (
                            <>
                                <div className="py-2.5 flex justify-between">
                                    <dt className="text-gray-500 dark:text-slate-400">Digunakan oleh</dt>
                                    <dd className="text-gray-900 dark:text-white">{redeemCode.user?.name || 'N/A'} <span className="text-gray-500 dark:text-slate-400">({redeemCode.user?.email})</span></dd>
                                </div>
                                <div className="py-2.5 flex justify-between">
                                    <dt className="text-gray-500 dark:text-slate-400">Tanggal redeem</dt>
                                    <dd className="text-gray-900 dark:text-white">{redeemCode.used_at ? new Date(redeemCode.used_at).toLocaleString('id-ID') : 'N/A'}</dd>
                                </div>
                            </>
                        )}
                    </dl>
                </div>
            </div>
        </AdminLayout>
    );
}
