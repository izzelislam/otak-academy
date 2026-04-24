import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Seo from '@/Components/Seo';
import PublicFooter from '@/Components/PublicFooter';

export default function TermsConditions({ auth }) {
    return (
        <>
            <Seo
                title="Syarat & Ketentuan"
                description="Syarat dan ketentuan penggunaan platform OtakAtikin untuk kursus, blog, dan produk digital."
                canonical={route('terms-conditions')}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'WebPage',
                    name: 'Syarat & Ketentuan - OtakAtikin',
                    url: route('terms-conditions'),
                }}
            />
            <div className="public-shell">
                <Navbar auth={auth} />

                {/* Content */}
                <main className="public-container-sm pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32">
                    <div className="mb-12">
                        <h1 className="text-[32px] sm:text-[40px] font-semibold tracking-[-0.02em] text-gray-900 dark:text-white">
                            Syarat & Ketentuan
                        </h1>
                        <p className="mt-4 text-[16px] text-gray-500 dark:text-white/50">
                            Terakhir diperbarui: 27 Februari 2026
                        </p>
                    </div>

                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <div className="space-y-8">
                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    1. Penerimaan Ketentuan
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Dengan mengakses dan menggunakan platform OtakAtikin, Anda setuju untuk terikat oleh Syarat & Ketentuan ini. Jika Anda tidak setuju dengan salah satu ketentuan yang tercantum di sini, mohon untuk tidak menggunakan layanan kami. Ketentuan ini berlaku untuk semua pengunjung, pengguna terdaftar, dan member di platform OtakAtikin.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    2. Definisi
                                </h2>
                                <div className="space-y-3">
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10">
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">"Platform"</strong> — Situs web dan layanan yang disediakan oleh OtakAtikin, termasuk seluruh halaman, konten, dan fitur yang tersedia.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10">
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">"Pengguna"</strong> — Setiap individu yang mengakses, mendaftar, atau menggunakan layanan OtakAtikin.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10">
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">"Konten"</strong> — Semua materi yang tersedia di platform termasuk kursus video, artikel blog, produk digital, template, dan aset lainnya.
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10">
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">"Produk Digital"</strong> — File, template, aset, atau materi digital lainnya yang tersedia untuk diunduh atau diakses melalui platform.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    3. Akun Pengguna
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-[18px] font-medium text-gray-800 dark:text-white/80 mb-2">
                                            a. Pendaftaran Akun
                                        </h3>
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            Untuk mengakses fitur tertentu, Anda perlu membuat akun dengan memberikan informasi yang akurat dan lengkap. Anda bertanggung jawab untuk menjaga kerahasiaan informasi login Anda.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] font-medium text-gray-800 dark:text-white/80 mb-2">
                                            b. Tanggung Jawab Akun
                                        </h3>
                                        <ul className="space-y-2 text-gray-600 dark:text-white/60">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Anda bertanggung jawab penuh atas semua aktivitas yang terjadi di akun Anda
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Segera laporkan jika terjadi penggunaan yang tidak sah pada akun Anda
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Satu akun hanya boleh digunakan oleh satu pengguna
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1">•</span>
                                                Dilarang membagikan akses akun kepada pihak lain
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    4. Pembelian & Pembayaran
                                </h2>
                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-[18px] font-medium text-gray-800 dark:text-white/80 mb-2">
                                            a. Harga & Mata Uang
                                        </h3>
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            Semua harga ditampilkan dalam mata uang Rupiah Indonesia (IDR) dan sudah termasuk pajak yang berlaku. Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya, namun perubahan harga tidak berlaku untuk transaksi yang sudah selesai.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] font-medium text-gray-800 dark:text-white/80 mb-2">
                                            b. Metode Pembayaran
                                        </h3>
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            Pembayaran diproses melalui gateway pembayaran pihak ketiga yang aman. Kami mendukung berbagai metode pembayaran termasuk transfer bank, e-wallet, dan kartu kredit/debit.
                                        </p>
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] font-medium text-gray-800 dark:text-white/80 mb-2">
                                            c. Konfirmasi Pembelian
                                        </h3>
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                            Setelah pembayaran berhasil, Anda akan menerima konfirmasi melalui email dan akses ke konten yang dibeli akan tersedia di dashboard Anda.
                                        </p>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    5. Kebijakan Refund
                                </h2>
                                <div className="space-y-4">
                                    <div className="p-5 rounded-xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20">
                                        <p className="text-gray-700 dark:text-white/70 leading-relaxed">
                                            <strong className="text-gray-900 dark:text-white">Tidak ada refund</strong> — Semua pembelian kursus dan produk digital bersifat <strong className="text-gray-900 dark:text-white">final</strong> dan tidak dapat dikembalikan (non-refundable). Pastikan Anda telah membaca deskripsi produk/kursus dengan teliti sebelum melakukan pembelian.
                                        </p>
                                    </div>
                                    <div className="p-5 rounded-xl bg-[#10a37f]/5 border border-[#10a37f]/20">
                                        <p className="text-gray-700 dark:text-white/70 leading-relaxed mb-3">
                                            <strong className="text-gray-900 dark:text-white">Pengecualian — Pembayaran Ganda:</strong>
                                        </p>
                                        <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-3">
                                            Refund hanya dapat diajukan jika terjadi <strong className="text-gray-900 dark:text-white">gangguan sistem pembayaran</strong> yang menyebabkan terjadinya pembayaran sebanyak 2 kali (duplikat) untuk 1 transaksi yang sama. Dalam kasus ini:
                                        </p>
                                        <ul className="space-y-2 text-gray-600 dark:text-white/60">
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1 font-bold">✓</span>
                                                <span>Hubungi tim support dengan menyertakan bukti pembayaran ganda (screenshot/mutasi rekening)</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1 font-bold">✓</span>
                                                <span>Tim kami akan memverifikasi dan memproses pengembalian dana untuk pembayaran yang terduplikasi</span>
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <span className="text-[#10a37f] mt-1 font-bold">✓</span>
                                                <span>Proses refund untuk pembayaran ganda akan diproses dalam 7-14 hari kerja setelah verifikasi berhasil</span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    6. Lisensi & Hak Kekayaan Intelektual
                                </h2>
                                <div className="space-y-4">
                                    <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                        Semua konten di platform OtakAtikin dilindungi oleh hak cipta dan hak kekayaan intelektual lainnya. Dengan membeli konten, Anda diberikan lisensi terbatas sebagai berikut:
                                    </p>
                                    <ul className="space-y-2 text-gray-600 dark:text-white/60">
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#10a37f] mt-1">•</span>
                                            Lisensi penggunaan pribadi dan non-eksklusif
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#10a37f] mt-1">•</span>
                                            Tidak boleh mendistribusikan, menjual kembali, atau membagikan konten kepada pihak lain
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#10a37f] mt-1">•</span>
                                            Tidak boleh merekam, menyalin, atau mereproduksi materi kursus
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-[#10a37f] mt-1">•</span>
                                            Produk digital hanya boleh digunakan sesuai lisensi yang tertera pada masing-masing produk
                                        </li>
                                    </ul>
                                </div>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    7. Kode Voucher & Redeem
                                </h2>
                                <ul className="space-y-2 text-gray-600 dark:text-white/60">
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Kode voucher bersifat unik, satu kali pakai, dan tidak dapat dipindahtangankan
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Kode voucher memiliki masa berlaku yang tertera pada kode tersebut
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        Kode voucher tidak dapat ditukar dengan uang tunai
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-[#10a37f] mt-1">•</span>
                                        OtakAtikin berhak membatalkan kode voucher yang didapatkan secara tidak sah
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    8. Penggunaan yang Dilarang
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-4">
                                    Anda dilarang untuk:
                                </p>
                                <ul className="space-y-2 text-gray-600 dark:text-white/60">
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✕</span>
                                        Menggunakan platform untuk tujuan ilegal atau tidak sah
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✕</span>
                                        Menyebarkan malware, virus, atau kode berbahaya lainnya
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✕</span>
                                        Mencoba mengakses akun pengguna lain tanpa izin
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✕</span>
                                        Melakukan scraping, crawling, atau pengumpulan data otomatis tanpa izin
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <span className="text-red-400 mt-1">✕</span>
                                        Mendistribusikan konten yang telah dibeli tanpa otorisasi
                                    </li>
                                </ul>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    9. Pembatasan Tanggung Jawab
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    OtakAtikin menyediakan layanan "sebagaimana adanya" dan tidak memberikan jaminan apa pun, baik tersurat maupun tersirat. Kami tidak bertanggung jawab atas kerugian langsung, tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan kami. Tanggung jawab maksimal kami terbatas pada jumlah yang Anda bayarkan untuk layanan terkait.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    10. Penangguhan & Penghentian Akun
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    OtakAtikin berhak untuk menangguhkan atau menghentikan akun Anda jika terjadi pelanggaran terhadap Syarat & Ketentuan ini, termasuk namun tidak terbatas pada penyalahgunaan layanan, distribusi konten tanpa izin, atau aktivitas yang merugikan platform dan pengguna lainnya.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    11. Perubahan Ketentuan
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Kami berhak mengubah atau memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan berlaku efektif setelah dipublikasikan di halaman ini. Penggunaan berkelanjutan atas layanan kami setelah perubahan berarti Anda menerima ketentuan yang diperbarui. Kami akan berusaha memberi tahu perubahan material melalui email atau notifikasi di platform.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    12. Hukum yang Berlaku
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Syarat & Ketentuan ini diatur oleh dan ditafsirkan sesuai dengan hukum Republik Indonesia. Segala sengketa yang timbul dari atau terkait dengan ketentuan ini akan diselesaikan melalui musyawarah terlebih dahulu, dan jika tidak tercapai, akan diselesaikan melalui pengadilan yang berwenang di Indonesia.
                                </p>
                            </section>

                            <section>
                                <h2 className="text-[24px] font-semibold text-gray-900 dark:text-white mb-4">
                                    13. Hubungi Kami
                                </h2>
                                <p className="text-gray-600 dark:text-white/60 leading-relaxed">
                                    Jika Anda memiliki pertanyaan tentang Syarat & Ketentuan ini, silakan hubungi kami:
                                </p>
                                <div className="mt-4 p-4 rounded-xl bg-gray-50 dark:bg-white/[0.03] border border-gray-200 dark:border-white/10 space-y-2">
                                    <p className="text-gray-700 dark:text-white/70">
                                        <strong className="text-gray-900 dark:text-white">Email:</strong> otakatikinid@gmail.com
                                    </p>
                                    <p className="text-gray-700 dark:text-white/70">
                                        <strong className="text-gray-900 dark:text-white">Halaman Kontak:</strong>{' '}
                                        <Link href={route('contact')} className="text-[#10a37f] hover:underline">
                                            otakatikin.com/kontak
                                        </Link>
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
