import MemberLayout from '@/Layouts/MemberLayout';
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
        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${colors[status] || colors.pending}`}>
            {labels[status] || status}
        </span>
    );
}

function getPayableType(payment) {
    if (!payment.payable_type) return '-';
    if (payment.payable_type.includes('Course')) return 'Course';
    if (payment.payable_type.includes('DownloadableAsset')) return 'Asset Digital';
    return '-';
}

function PaymentCard({ payment }) {
    const payableName = payment.payable?.title || 'Item tidak ditemukan';
    const payableType = getPayableType(payment);

    return (
        <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-4 hover:border-[#10a37f]/30 transition-colors">
            <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium ${
                            payableType === 'Course'
                                ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                                : 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
                        }`}>
                            {payableType}
                        </span>
                        <StatusBadge status={payment.status} />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">{payableName}</h3>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1 font-mono">{payment.order_id}</p>
                </div>
                <div className="text-right flex-shrink-0">
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{formatCurrency(payment.amount)}</p>
                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">{formatDate(payment.created_at)}</p>
                </div>
            </div>
            {payment.payment_type && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-xs text-gray-500 dark:text-slate-400">
                        Metode: <span className="text-gray-700 dark:text-slate-300 capitalize">{payment.payment_type.replace(/_/g, ' ')}</span>
                    </span>
                    {payment.paid_at && (
                        <div className="flex items-center gap-4">
                            <span className="text-xs text-emerald-600 dark:text-emerald-400">
                                Dibayar: {formatDate(payment.paid_at)}
                            </span>
                            {payment.status === 'paid' && (
                                <a
                                    href={route('payment.invoice', payment.id)}
                                    // Use target="_blank" so it doesn't navigate away in Inertia
                                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-gray-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200 text-xs font-medium rounded-md transition-colors"
                                >
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m.75 12 3 3m0 0 3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
                                    </svg>
                                    Invoice
                                </a>
                            )}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

export default function PaymentHistory({ payments }) {
    return (
        <MemberLayout title="Riwayat Pembayaran">
            <Head title="Riwayat Pembayaran" />

            <div className="max-w-2xl mx-auto space-y-6">
                {/* Header */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-[#10a37f]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                            </svg>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">Riwayat Pembayaran</h1>
                            <p className="text-sm text-gray-500 dark:text-slate-400">Lihat semua transaksi pembelian Anda</p>
                        </div>
                    </div>
                </div>

                {/* Payment List */}
                {payments.data && payments.data.length > 0 ? (
                    <div className="space-y-3">
                        {payments.data.map((payment) => (
                            <PaymentCard key={payment.id} payment={payment} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-8">
                        <div className="text-center py-8">
                            <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8 text-gray-400 dark:text-slate-500" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Belum ada transaksi</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mb-4">
                                Anda belum melakukan pembelian course atau asset digital.
                            </p>
                            <Link
                                href={route('member.classes.index')}
                                className="inline-flex items-center px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                            >
                                Jelajahi Kelas
                            </Link>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                {payments.links && payments.links.length > 3 && (
                    <div className="flex items-center justify-center gap-1">
                        {payments.links.map((link, i) => (
                            <Link
                                key={i}
                                href={link.url || '#'}
                                className={`px-3 py-1.5 rounded-lg text-xs transition-colors ${
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
                )}
            </div>
        </MemberLayout>
    );
}
