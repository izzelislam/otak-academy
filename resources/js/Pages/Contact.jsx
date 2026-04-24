import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';
import Seo from '@/Components/Seo';

function EnvelopeIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
        </svg>
    );
}

function ChatBubbleIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
        </svg>
    );
}

function ClockIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

function MapPinIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
        </svg>
    );
}

function QuestionMarkIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
        </svg>
    );
}

function ArrowTopRightIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
        </svg>
    );
}

function CheckCircleIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

const contactMethods = [
    {
        icon: EnvelopeIcon,
        title: 'Email Support',
        description: 'Kirim pertanyaan atau kendala kamu via email. Tim kami akan merespons dalam 1x24 jam.',
        action: 'otakatikinid@gmail.com',
        actionLabel: 'Kirim Email',
        href: 'mailto:otakatikinid@gmail.com',
        badge: 'Respons 1x24 jam',
    },
    {
        icon: ChatBubbleIcon,
        title: 'WhatsApp',
        description: 'Chat langsung dengan tim support kami via WhatsApp untuk respon yang lebih cepat.',
        action: '+62 895-4189-32988',
        actionLabel: 'Chat WhatsApp',
        href: 'https://wa.me/62895418932988?text=Halo%20OtakAtikin%2C%20saya%20butuh%20bantuan',
        badge: 'Respons cepat',
    },
];

const faqItems = [
    {
        question: 'Bagaimana cara membeli kursus atau produk digital?',
        answer: 'Pilih kursus atau produk digital yang kamu inginkan, lalu klik tombol "Beli". Kamu akan diarahkan ke halaman pembayaran. Setelah pembayaran berhasil, kursus/produk akan langsung tersedia di dashboard kamu.',
    },
    {
        question: 'Apakah akses kursus berlaku seumur hidup?',
        answer: 'Ya! Setelah kamu membeli kursus, kamu akan mendapatkan akses seumur hidup. Kamu bisa mengulang materi kapan saja tanpa biaya tambahan.',
    },
    {
        question: 'Bagaimana cara redeem kode voucher?',
        answer: 'Login ke akunmu, lalu masuk ke menu "Redeem Code" di dashboard. Masukkan kode voucher yang kamu miliki dan klik "Redeem". Produk atau kursus akan langsung ditambahkan ke akun kamu.',
    },
    {
        question: 'Bagaimana jika saya mengalami masalah saat pembayaran?',
        answer: 'Jika pembayaran gagal atau ada kendala, silakan hubungi tim support kami via email atau WhatsApp dengan menyertakan bukti pembayaran. Kami akan membantu menyelesaikan masalah kamu secepatnya.',
    },
    {
        question: 'Bisakah saya mendapatkan refund?',
        answer: 'Semua pembelian kursus dan produk digital bersifat final dan tidak dapat di-refund. Refund hanya dapat diajukan jika terjadi gangguan sistem pembayaran yang menyebabkan pembayaran ganda (2 kali bayar) untuk 1 transaksi yang sama. Jika hal ini terjadi, hubungi support kami dengan menyertakan bukti pembayaran ganda (screenshot/mutasi rekening).',
    },
    {
        question: 'Bagaimana cara mendownload produk digital?',
        answer: 'Setelah pembayaran berhasil, masuk ke dashboard → "My Assets". Klik tombol download pada produk yang kamu beli. Link download bersifat unik dan memiliki batas waktu untuk keamanan.',
    },
];

export default function Contact({ auth }) {
    const [openFaq, setOpenFaq] = useState(null);

    const toggleFaq = (index) => {
        setOpenFaq(openFaq === index ? null : index);
    };

    return (
        <>
            <Seo
                title="Kontak & Support"
                description="Hubungi tim OtakAtikin untuk bantuan pembelian, akses kursus, produk digital, dan pertanyaan umum lainnya."
                canonical={route('contact')}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'ContactPage',
                    name: 'Kontak OtakAtikin',
                    url: route('contact'),
                }}
            />
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 bg-white dark:bg-black" />
                    <div 
                        className="absolute inset-0 opacity-30 dark:opacity-100"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                        }}
                    />
                    <div 
                        className="absolute inset-0 hidden dark:block"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                            maskImage: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(0,0,0,0.6) 0%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 50% 50% at 50% 30%, rgba(0,0,0,0.6) 0%, transparent 70%)',
                        }}
                    />

                    {/* Spotlight glow */}
                    <div className="absolute inset-0 overflow-hidden opacity-60 dark:opacity-100">
                        <div 
                            className="absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(16,163,127,0.15) 0%, transparent 60%)',
                                filter: 'blur(60px)',
                                top: '-10%',
                                left: '30%',
                            }}
                        />
                    </div>

                    <div className="relative max-w-[1200px] mx-auto px-6 text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10a37f] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10a37f]"></span>
                            </span>
                            <span className="text-[13px] text-gray-600 dark:text-white/60 font-medium">Tim support siap membantu</span>
                        </div>

                        <h1 className="text-[36px] sm:text-[48px] lg:text-[56px] font-semibold leading-[1.1] tracking-[-0.02em] max-w-3xl mx-auto">
                            <span className="text-gray-900 dark:text-white">Ada pertanyaan? </span>
                            <span className="text-[#10a37f]">Kami siap bantu</span>
                        </h1>

                        <p className="mt-6 text-[16px] sm:text-[18px] text-gray-500 dark:text-white/50 font-normal leading-relaxed max-w-xl mx-auto">
                            Hubungi tim support kami untuk pertanyaan, kendala, atau masukan. Kami selalu siap membantu kamu.
                        </p>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="relative pb-20">
                    <div className="max-w-[900px] mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.href}
                                    target={method.href.startsWith('http') ? '_blank' : undefined}
                                    rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                    className="group relative p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.12] transition-all duration-300"
                                >
                                    {/* Badge */}
                                    <div className="absolute top-4 right-4 sm:top-6 sm:right-6">
                                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-medium bg-[#10a37f]/10 text-[#10a37f] border border-[#10a37f]/20">
                                            <CheckCircleIcon className="w-3 h-3" />
                                            {method.badge}
                                        </span>
                                    </div>

                                    {/* Icon */}
                                    <div className="h-12 w-12 rounded-xl bg-gray-200 dark:bg-white/[0.06] flex items-center justify-center mb-5 group-hover:bg-[#10a37f]/20 transition-colors duration-300">
                                        <method.icon className="h-6 w-6 text-gray-600 dark:text-white/60 group-hover:text-[#10a37f] transition-colors duration-300" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-2">
                                        {method.title}
                                    </h3>
                                    <p className="text-[14px] text-gray-500 dark:text-white/40 leading-relaxed mb-5">
                                        {method.description}
                                    </p>

                                    {/* Action */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-[14px] font-medium text-gray-700 dark:text-white/70">
                                            {method.action}
                                        </span>
                                        <span className="inline-flex items-center gap-1 text-[13px] font-medium text-[#10a37f] group-hover:gap-2 transition-all duration-300">
                                            {method.actionLabel}
                                            <ArrowTopRightIcon className="w-3.5 h-3.5" />
                                        </span>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Additional Info Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-white/[0.06] flex items-center justify-center">
                                        <ClockIcon className="h-5 w-5 text-gray-600 dark:text-white/60" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-semibold text-gray-900 dark:text-white">Jam Operasional</h4>
                                        <p className="text-[13px] text-gray-500 dark:text-white/40">Senin - Jumat</p>
                                    </div>
                                </div>
                                <p className="text-[14px] text-gray-600 dark:text-white/50 leading-relaxed">
                                    09:00 - 17:00 WIB (Hari kerja). Pesan di luar jam kerja akan direspons pada hari kerja berikutnya.
                                </p>
                            </div>

                            <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-white/[0.06] flex items-center justify-center">
                                        <MapPinIcon className="h-5 w-5 text-gray-600 dark:text-white/60" />
                                    </div>
                                    <div>
                                        <h4 className="text-[15px] font-semibold text-gray-900 dark:text-white">Lokasi</h4>
                                        <p className="text-[13px] text-gray-500 dark:text-white/40">Indonesia</p>
                                    </div>
                                </div>
                                <p className="text-[14px] text-gray-600 dark:text-white/50 leading-relaxed">
                                    OtakAtikin beroperasi secara remote dari Indonesia. Semua komunikasi dilakukan secara online.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative py-20 sm:py-28 border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="max-w-[800px] mx-auto px-6">
                        <div className="text-center mb-12">
                            <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-[#10a37f]/10 border border-[#10a37f]/20 mb-4">
                                <QuestionMarkIcon className="h-6 w-6 text-[#10a37f]" />
                            </div>
                            <h2 className="text-[28px] sm:text-[36px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em]">
                                Pertanyaan yang Sering Ditanyakan
                            </h2>
                            <p className="mt-3 text-[15px] sm:text-[16px] text-gray-500 dark:text-white/40">
                                Temukan jawaban untuk pertanyaan umum di bawah ini
                            </p>
                        </div>

                        <div className="space-y-3">
                            {faqItems.map((item, index) => (
                                <div
                                    key={index}
                                    className={`rounded-xl border transition-all duration-300 overflow-hidden ${
                                        openFaq === index
                                            ? 'bg-gray-50 dark:bg-white/[0.03] border-gray-300 dark:border-white/[0.12]'
                                            : 'bg-white dark:bg-transparent border-gray-200 dark:border-white/[0.06] hover:border-gray-300 dark:hover:border-white/[0.1]'
                                    }`}
                                >
                                    <button
                                        onClick={() => toggleFaq(index)}
                                        className="w-full flex items-center justify-between p-5 text-left"
                                    >
                                        <span className="text-[15px] font-medium text-gray-900 dark:text-white pr-4">
                                            {item.question}
                                        </span>
                                        <span className={`flex-shrink-0 h-6 w-6 rounded-full flex items-center justify-center border transition-all duration-300 ${
                                            openFaq === index
                                                ? 'bg-[#10a37f] border-[#10a37f] rotate-45'
                                                : 'bg-gray-100 dark:bg-white/[0.06] border-gray-200 dark:border-white/[0.1]'
                                        }`}>
                                            <svg className={`h-3 w-3 transition-colors duration-300 ${openFaq === index ? 'text-white' : 'text-gray-500 dark:text-white/50'}`} fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                            </svg>
                                        </span>
                                    </button>
                                    <div
                                        className={`transition-all duration-300 ease-in-out ${
                                            openFaq === index ? 'max-h-60 opacity-100' : 'max-h-0 opacity-0'
                                        }`}
                                    >
                                        <p className="px-5 pb-5 text-[14px] text-gray-600 dark:text-white/50 leading-relaxed">
                                            {item.answer}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="relative py-20 sm:py-28">
                    <div className="max-w-[800px] mx-auto px-6">
                        <div className="relative rounded-2xl bg-gray-100 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/[0.08] p-10 sm:p-14 overflow-hidden text-center">
                            {/* Gradient overlay */}
                            <div 
                                className="absolute inset-0 opacity-50"
                                style={{
                                    background: 'radial-gradient(ellipse at top, rgba(16,163,127,0.08) 0%, transparent 60%)',
                                }}
                            />
                            
                            <div className="relative">
                                <h2 className="text-[24px] sm:text-[30px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em]">
                                    Masih butuh bantuan?
                                </h2>
                                <p className="mt-3 text-[14px] sm:text-[15px] text-gray-600 dark:text-white/50 max-w-md mx-auto leading-relaxed">
                                    Jangan ragu untuk menghubungi kami. Tim support kami selalu siap membantu kamu menyelesaikan masalah.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                    <a
                                        href="mailto:support@otakatikin.com"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium text-white bg-black hover:bg-black/90 dark:text-black dark:bg-white dark:hover:bg-white/90 rounded-lg transition-colors"
                                    >
                                        <EnvelopeIcon className="h-4 w-4" />
                                        Email Support
                                    </a>
                                    <a
                                        href="https://wa.me/6281234567890"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium text-gray-600 hover:text-gray-900 bg-transparent border border-gray-200 hover:border-gray-300 dark:text-white/80 dark:hover:text-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 rounded-lg transition-colors"
                                    >
                                        <ChatBubbleIcon className="h-4 w-4" />
                                        Chat WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6 py-8">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <img src="/favicon/favicon-96x96.png" alt="OtakAtikin" className="h-6 w-6" />
                                <p className="text-[13px] text-gray-500 dark:text-white/40">
                                    © {new Date().getFullYear()} OtakAtikin. All rights reserved.
                                </p>
                            </div>
                            <div className="flex items-center gap-6 text-[13px]">
                                <Link href="/" className="text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                                    Beranda
                                </Link>
                                <Link href={route('blog.index')} className="text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                                    Blog
                                </Link>
                                <Link href={route('assets.index')} className="text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                                    Produk Digital
                                </Link>
                                {/* <Link href={route('privacy-policy')} className="text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                                    Privacy Policy
                                </Link> */}
                                <Link href={route('terms-conditions')} className="text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                                    Syarat & Ketentuan
                                </Link>
                                <Link href={route('contact')} className="text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                                    Kontak
                                </Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}
