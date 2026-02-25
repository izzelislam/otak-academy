import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

function formatCurrency(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

export default function PaymentFinish({ auth, payment, transactionStatus }) {
    const isSuccess = payment?.status === 'paid' || transactionStatus === 'settlement';
    const isPending = payment?.status === 'pending' || transactionStatus === 'pending';

    return (
        <>
            <Head title="Pembayaran" />
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
                <Navbar auth={auth} />

                <div className="pt-24 pb-16">
                    <div className="max-w-md mx-auto px-6">
                        <div className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl p-8 text-center shadow-sm dark:shadow-none">
                            {isSuccess ? (
                                <>
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-emerald-100 dark:bg-emerald-500/10 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pembayaran Berhasil!</h1>
                                    <p className="text-gray-500 dark:text-white/60 mb-6">
                                        Terima kasih atas pembelian Anda. Akses Anda telah diaktifkan.
                                    </p>
                                    {payment && (
                                        <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-xl p-4 mb-6 text-left space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-white/50">Order ID</span>
                                                <span className="font-mono text-gray-900 dark:text-white text-xs">{payment.order_id}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-white/50">Total</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(payment.amount)}</span>
                                            </div>
                                        </div>
                                    )}
                                    <div className="flex flex-col gap-3">
                                        <Link
                                            href={route('member.courses.index')}
                                            className="w-full px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] text-white font-medium rounded-xl transition-colors text-center"
                                        >
                                            Lihat My Courses
                                        </Link>
                                        <Link
                                            href={route('member.payment.history')}
                                            className="w-full px-6 py-3 border border-gray-200 dark:border-white/[0.1] text-gray-700 dark:text-white/70 hover:bg-gray-50 dark:hover:bg-white/[0.03] font-medium rounded-xl transition-colors text-center"
                                        >
                                            Riwayat Pembayaran
                                        </Link>
                                    </div>
                                </>
                            ) : isPending ? (
                                <>
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-amber-100 dark:bg-amber-500/10 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-amber-600 dark:text-amber-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Menunggu Pembayaran</h1>
                                    <p className="text-gray-500 dark:text-white/60 mb-6">
                                        Silakan selesaikan pembayaran Anda. Akses akan aktif setelah pembayaran dikonfirmasi.
                                    </p>
                                    {payment && (
                                        <div className="bg-gray-50 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-xl p-4 mb-6 text-left space-y-2">
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-white/50">Order ID</span>
                                                <span className="font-mono text-gray-900 dark:text-white text-xs">{payment.order_id}</span>
                                            </div>
                                            <div className="flex justify-between text-sm">
                                                <span className="text-gray-500 dark:text-white/50">Total</span>
                                                <span className="font-semibold text-gray-900 dark:text-white">{formatCurrency(payment.amount)}</span>
                                            </div>
                                        </div>
                                    )}
                                    <Link
                                        href={route('member.payment.history')}
                                        className="w-full inline-block px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white font-medium rounded-xl transition-colors text-center"
                                    >
                                        Cek Status Pembayaran
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-100 dark:bg-red-500/10 flex items-center justify-center">
                                        <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Pembayaran Gagal</h1>
                                    <p className="text-gray-500 dark:text-white/60 mb-6">
                                        Maaf, pembayaran tidak berhasil diproses. Silakan coba lagi.
                                    </p>
                                    <Link
                                        href={route('member.classes.index')}
                                        className="w-full inline-block px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] text-white font-medium rounded-xl transition-colors text-center"
                                    >
                                        Kembali ke Kelas
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
