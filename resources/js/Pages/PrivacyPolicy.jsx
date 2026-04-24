import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Seo from '@/Components/Seo';
import PublicFooter from '@/Components/PublicFooter';

export default function PrivacyPolicy({ auth }) {
    return (
        <>
            <Seo
                title="Privacy Policy"
                description="Kebijakan privasi OtakAtikin yang menjelaskan pengumpulan, penggunaan, dan perlindungan data pengguna."
                canonical={route('privacy-policy')}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Privacy Policy - OtakAtikin',
                    url: route('privacy-policy'),
                }}
            />
            <div className="public-shell">
                <Navbar auth={auth} />

                {/* Content */}
                <main className="public-container-sm pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32">
                    <div className="mb-12">
                        <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                            Privacy Policy
                        </h1>
                        <p className="mt-4 text-[16px] text-gray-500 dark:text-white/50">
                            Terakhir diperbarui: 13 Januari 2026
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    1. Pendahuluan
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Selamat datang di OtakAtikin. Kami berkomitmen untuk melindungi privasi Anda. Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, mengungkapkan, dan melindungi informasi Anda ketika Anda menggunakan layanan kami.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    2. Informasi yang Kami Kumpulkan
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-[18px] font-medium text-gray-800 dark:text-white/80 mb-2">
                                            a. Informasi Pribadi
                                        </h3>
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            Kami dapat mengumpulkan informasi pribadi yang Anda berikan secara langsung, termasuk namun tidak terbatas pada:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600 dark:text-white/60">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Nama lengkap
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Alamat email
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Nomor telepon
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Informasi pembayaran
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] font-medium text-gray-800 dark:text-white/80 mb-2">
                                            b. Informasi Otomatis
                                        </h3>
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            Ketika Anda menggunakan layanan kami, kami secara otomatis mengumpulkan informasi tertentu, termasuk:
                                        </p>
                                        <ul className="mt-3 space-y-2 text-gray-600 dark:text-white/60">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Alamat IP
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Jenis browser dan perangkat
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Halaman yang dikunjungi
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Waktu dan tanggal kunjungan
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    3. Penggunaan Informasi
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-4">
                                    Kami menggunakan informasi yang dikumpulkan untuk:
                                </p>
                                <ul className="space-y-2 text-gray-600 dark:text-white/60">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Menyediakan dan memelihara layanan kami
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Memproses transaksi dan mengirim konfirmasi
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Mengirim pembaruan dan informasi terkait layanan
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Meningkatkan pengalaman pengguna
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Menanggapi pertanyaan dan permintaan dukungan
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    4. Keamanan Data
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Kami menerapkan langkah-langkah keamanan teknis dan organisasi yang sesuai untuk melindungi data pribadi Anda dari akses, pengungkapan, perubahan, atau penghancuran yang tidak sah. Namun, tidak ada metode transmisi melalui internet yang 100% aman, dan kami tidak dapat menjamin keamanan mutlak.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    5. Cookies
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Kami menggunakan cookies dan teknologi pelacakan serupa untuk melacak aktivitas di layanan kami dan menyimpan informasi tertentu. Anda dapat mengatur browser Anda untuk menolak semua cookies atau untuk menunjukkan ketika cookie sedang dikirim.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    6. Berbagi Informasi
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Kami tidak menjual, memperdagangkan, atau menyewakan informasi pribadi Anda kepada pihak ketiga. Kami dapat membagikan informasi dengan penyedia layanan pihak ketiga yang membantu kami dalam mengoperasikan layanan kami, dengan ketentuan mereka setuju untuk menjaga kerahasiaan informasi tersebut.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    7. Hak Pengguna
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-4">
                                    Anda memiliki hak untuk:
                                </p>
                                <ul className="space-y-2 text-gray-600 dark:text-white/60">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Mengakses data pribadi yang kami miliki tentang Anda
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Meminta koreksi data yang tidak akurat
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Meminta penghapusan data Anda
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Menolak pemrosesan data Anda
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    8. Perubahan Kebijakan
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Kami akan memberi tahu Anda tentang perubahan apa pun dengan memposting Kebijakan Privasi baru di halaman ini dan memperbarui tanggal "Terakhir diperbarui".
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    9. Hubungi Kami
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, silakan hubungi kami di:
                                </p>
                                <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10">
                                    <p className="text-gray-700 dark:text-white/70">
                                        <strong className="text-gray-900 dark:text-white">Email:</strong> support@otakatikin.com
                                    </p>
                                </div>
                            </section>
                        </div>
                    </div>
                </main>

                <PublicFooter />
            </div>
        </>
    );
}
