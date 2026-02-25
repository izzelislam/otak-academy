import AdminLayout from '@/Layouts/AdminLayout';
import { Head, Link } from '@inertiajs/react';

function formatCurrency(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

function formatDate(dateStr) {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
    });
}

function StatusBadge({ status }) {
    const colors = {
        paid: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400',
        pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400',
        failed: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
        expired: 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400',
        refunded: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400',
    };
    const labels = { paid: 'Lunas', pending: 'Menunggu', failed: 'Gagal', expired: 'Kedaluwarsa', refunded: 'Refund' };

    return (
        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
            {labels[status] || status}
        </span>
    );
}

function getPayableName(payment) {
    if (!payment.payable) return '-';
    return payment.payable.title || '-';
}

function getPayableType(payment) {
    if (!payment.payable_type) return '-';
    if (payment.payable_type.includes('Course')) return 'Course';
    if (payment.payable_type.includes('DownloadableAsset')) return 'Asset';
    return '-';
}

export default function PaymentsIndex({ payments, stats, currentStatus }) {
    const statusFilters = [
        { label: 'Semua', value: '' },
        { label: 'Lunas', value: 'paid' },
        { label: 'Menunggu', value: 'pending' },
        { label: 'Gagal', value: 'failed' },
        { label: 'Kedaluwarsa', value: 'expired' },
    ];

    return (
        <AdminLayout title="Pembayaran">
            <Head title="Pembayaran" />

            <div className="space-y-6">
                {/* Stats Cards */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4">
                        <p className="text-xs text-gray-500 dark:text-slate-400">Total Transaksi</p>
                        <p className="text-xl font-bold text-gray-900 dark:text-white mt-1">{stats.total}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4">
                        <p className="text-xs text-gray-500 dark:text-slate-400">Lunas</p>
                        <p className="text-xl font-bold text-emerald-600 dark:text-emerald-400 mt-1">{stats.paid}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4">
                        <p className="text-xs text-gray-500 dark:text-slate-400">Menunggu</p>
                        <p className="text-xl font-bold text-amber-600 dark:text-amber-400 mt-1">{stats.pending}</p>
                    </div>
                    <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4">
                        <p className="text-xs text-gray-500 dark:text-slate-400">Gagal</p>
                        <p className="text-xl font-bold text-red-600 dark:text-red-400 mt-1">{stats.failed}</p>
                    </div>
                    <div className="col-span-2 lg:col-span-1 bg-gradient-to-br from-[#10a37f] to-emerald-600 rounded-lg p-4">
                        <p className="text-xs text-white/70">Total Pendapatan</p>
                        <p className="text-xl font-bold text-white mt-1">{formatCurrency(stats.total_revenue)}</p>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 flex-wrap">
                    {statusFilters.map((filter) => (
                        <Link
                            key={filter.value}
                            href={route('admin.payments.index', filter.value ? { status: filter.value } : {})}
                            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                                (currentStatus || '') === filter.value
                                    ? 'bg-[#10a37f] text-white'
                                    : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-gray-200 dark:hover:bg-slate-700'
                            }`}
                        >
                            {filter.label}
                        </Link>
                    ))}
                </div>

                {/* Payments Table */}
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-200 dark:border-slate-800">
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">Order ID</th>
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">User</th>
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">Item</th>
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">Tipe</th>
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">Jumlah</th>
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">Metode</th>
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">Status</th>
                                    <th className="px-4 py-3 text-xs font-medium text-gray-500 dark:text-slate-400 uppercase">Tanggal</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                                {payments.data && payments.data.length > 0 ? (
                                    payments.data.map((payment) => (
                                        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors">
                                            <td className="px-4 py-3">
                                                <span className="text-xs font-mono text-gray-900 dark:text-white">{payment.order_id}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-gray-900 dark:text-white">{payment.user?.name || '-'}</span>
                                                <p className="text-xs text-gray-500 dark:text-slate-400">{payment.user?.email || ''}</p>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm text-gray-900 dark:text-white truncate max-w-[200px] block">{getPayableName(payment)}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                                    getPayableType(payment) === 'Course'
                                                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                                        : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                                                }`}>
                                                    {getPayableType(payment)}
                                                </span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-sm font-medium text-gray-900 dark:text-white">{formatCurrency(payment.amount)}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-gray-500 dark:text-slate-400">{payment.payment_type || '-'}</span>
                                            </td>
                                            <td className="px-4 py-3">
                                                <StatusBadge status={payment.status} />
                                            </td>
                                            <td className="px-4 py-3">
                                                <span className="text-xs text-gray-500 dark:text-slate-400">{formatDate(payment.created_at)}</span>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={8} className="px-4 py-12 text-center">
                                            <p className="text-sm text-gray-500 dark:text-slate-400">Belum ada data pembayaran.</p>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {payments.links && payments.links.length > 3 && (
                        <div className="px-4 py-3 border-t border-gray-200 dark:border-slate-800 flex items-center justify-between">
                            <p className="text-xs text-gray-500 dark:text-slate-400">
                                Menampilkan {payments.from} - {payments.to} dari {payments.total}
                            </p>
                            <div className="flex gap-1">
                                {payments.links.map((link, i) => (
                                    <Link
                                        key={i}
                                        href={link.url || '#'}
                                        className={`px-3 py-1 rounded text-xs transition-colors ${
                                            link.active
                                                ? 'bg-[#10a37f] text-white'
                                                : link.url
                                                    ? 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400 hover:bg-gray-200'
                                                    : 'bg-gray-50 text-gray-300 dark:bg-slate-900 dark:text-slate-600 cursor-not-allowed'
                                        }`}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                        preserveScroll
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
