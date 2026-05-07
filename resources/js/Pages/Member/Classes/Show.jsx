import MemberLayout from '@/Layouts/MemberLayout';
import { Head, Link } from '@inertiajs/react';
import { useState } from 'react';
import axios from 'axios';

function formatCurrency(amount) {
    return 'Rp ' + new Intl.NumberFormat('id-ID').format(amount);
}

export default function ClassShow({ course, isEnrolled }) {
    const allMaterials = course.sessions?.flatMap(s => s.materials || []) || [];
    const totalMaterials = allMaterials.length;
    const totalSubMaterials = allMaterials.reduce((acc, m) => acc + (m.sub_materials?.length || 0), 0);
    const [isPaymentLoading, setIsPaymentLoading] = useState(false);
    const [paymentError, setPaymentError] = useState(null);

    const handleBuyCourse = async () => {
        setIsPaymentLoading(true);
        setPaymentError(null);

        try {
            const response = await axios.post(route('member.payment.course', course.id));
            const { snap_token, client_key } = response.data;

            // Open Midtrans Snap popup
            window.snap.pay(snap_token, {
                onSuccess: function(result) {
                    window.location.href = route('payment.finish') + '?order_id=' + result.order_id + '&transaction_status=settlement';
                },
                onPending: function(result) {
                    window.location.href = route('payment.finish') + '?order_id=' + result.order_id + '&transaction_status=pending';
                },
                onError: function(result) {
                    setPaymentError('Pembayaran gagal. Silakan coba lagi.');
                    setIsPaymentLoading(false);
                },
                onClose: function() {
                    setIsPaymentLoading(false);
                }
            });
        } catch (err) {
            setPaymentError(err.response?.data?.message || 'Gagal memproses pembayaran.');
            setIsPaymentLoading(false);
        }
    };

    return (
        <MemberLayout title={course.title}>
            <Head title={course.title} />

            {/* Midtrans Snap JS */}
            <script
                type="text/javascript"
                src="https://app.sandbox.midtrans.com/snap/snap.js"
                data-client-key={window.midtransClientKey || ''}
            />

            <div className="space-y-6">
                {/* Back Button */}
                <Link
                    href={route('member.classes.index')}
                    className="inline-flex items-center text-sm text-gray-500 dark:text-slate-400 hover:text-[#10a37f] transition-colors"
                >
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                    Kembali ke Kelas
                </Link>

                <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                    <div className="space-y-6">
                        {course.thumbnail && (
                            <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                                <div className="aspect-square max-h-[400px]">
                                    <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover" />
                                </div>
                            </div>
                        )}

                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-5">
                            <div className="flex items-center gap-2 mb-3">
                                {course.is_featured && (
                                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-semibold rounded-full">⭐ Featured</span>
                                )}
                                {course.access_type === 'premium' && (
                                    <span className="px-2.5 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-semibold rounded-full flex items-center gap-1">
                                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" /></svg>
                                        Premium
                                    </span>
                                )}
                                {course.access_type === 'free' && (
                                    <span className="px-2.5 py-1 bg-[#10a37f]/10 text-[#10a37f] text-xs font-semibold rounded-full">Gratis</span>
                                )}
                                {isEnrolled && (
                                    <span className="px-2.5 py-1 bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20 text-xs font-medium rounded-full">✓ Enrolled</span>
                                )}
                            </div>

                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">{course.title}</h1>

                            {course.description && (
                                <div className="text-sm text-gray-600 dark:text-slate-400 prose prose-sm dark:prose-invert max-w-none" dangerouslySetInnerHTML={{ __html: course.description }} />
                            )}
                        </div>
                    </div>

                    <div className="lg:sticky lg:top-4 lg:self-start space-y-4">
                        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-5">
                            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-4">Detail Kelas</h3>
                            <dl className="space-y-3 text-sm">
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-slate-400">Materi</dt>
                                    <dd className="font-medium text-gray-900 dark:text-white">{totalMaterials}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-slate-400">Sub-Materi</dt>
                                    <dd className="font-medium text-gray-900 dark:text-white">{totalSubMaterials}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-gray-500 dark:text-slate-400">Siswa</dt>
                                    <dd className="font-medium text-gray-900 dark:text-white">{course.enrolled_users_count || 0}</dd>
                                </div>
                                {course.access_type === 'premium' && course.price > 0 && !isEnrolled && (
                                    <div className="flex justify-between">
                                        <dt className="text-gray-500 dark:text-slate-400">Harga</dt>
                                        <dd className="font-bold text-amber-600 dark:text-amber-400">{formatCurrency(course.price)}</dd>
                                    </div>
                                )}
                            </dl>

                            {paymentError && (
                                <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-xs text-red-700 dark:text-red-300">{paymentError}</p>
                                </div>
                            )}

                            <div className="mt-5 pt-5 border-t border-gray-200 dark:border-slate-800">
                                {isEnrolled ? (
                                    <Link
                                        href={route('member.courses.show', course.id)}
                                        className="flex items-center justify-center w-full px-4 py-2.5 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        Mulai Belajar
                                    </Link>
                                ) : course.access_type === 'premium' && course.price > 0 ? (
                                    <button
                                        onClick={handleBuyCourse}
                                        disabled={isPaymentLoading}
                                        className="flex items-center justify-center w-full px-5 py-2.5 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        {isPaymentLoading ? (
                                            <>
                                                <svg className="animate-spin w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Memproses...
                                            </>
                                        ) : (
                                            <>Beli Kelas — {formatCurrency(course.price)}</>
                                        )}
                                    </button>
                                ) : (
                                    <Link
                                        href={route('member.redeem.create')}
                                        className="flex items-center justify-center w-full px-4 py-2.5 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors"
                                    >
                                        Redeem Code
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Course Content */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Konten Kelas</h2>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">
                            {totalMaterials} materi • {totalSubMaterials} sub-materi
                        </p>
                    </div>

                    {(() => {
                        const allMaterials = course.sessions?.flatMap(s => s.materials || []) || [];
                        return allMaterials.length > 0 ? (
                            <div className="divide-y divide-gray-100 dark:divide-slate-800">
                                {allMaterials.map((material, index) => (
                                    <div key={material.id} className="px-4 py-3">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="flex-shrink-0 w-7 h-7 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center">
                                                <span className="text-xs font-medium text-[#10a37f]">{index + 1}</span>
                                            </div>
                                            <span className="text-sm font-medium text-gray-900 dark:text-white">{material.title}</span>
                                            <span className="text-xs text-gray-400 dark:text-slate-500">{material.sub_materials?.length || 0} sub-materi</span>
                                        </div>
                                        {material.sub_materials?.length > 0 && (
                                            <div className="ml-10 space-y-1">
                                                {material.sub_materials.map((sub) => (
                                                    <div key={sub.id} className="flex items-center gap-2 text-xs text-gray-500 dark:text-slate-400">
                                                        <span className="w-1.5 h-1.5 rounded-full bg-gray-300 dark:bg-slate-600 flex-shrink-0" />
                                                        <span className="truncate">{sub.title}</span>
                                                        <span className="text-[10px] px-1 py-0.5 rounded bg-gray-100 dark:bg-slate-800 text-gray-400 dark:text-slate-500 flex-shrink-0">{sub.type}</span>
                                                        {!isEnrolled && (
                                                            <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                                            </svg>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="px-4 py-8 text-center">
                                <p className="text-sm text-gray-500 dark:text-slate-400">Belum ada konten untuk kelas ini.</p>
                            </div>
                        );
                    })()}
                </div>
            </div>
        </MemberLayout>
    );
}
