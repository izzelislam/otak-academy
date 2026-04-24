import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import Seo from '@/Components/Seo';

function ArrowRightIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
    );
}

function SparklesIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18l-.813-2.096a4.5 4.5 0 0 0-2.291-2.291L3.75 12l2.146-.813a4.5 4.5 0 0 0 2.291-2.291L9 6.75l.813 2.146a4.5 4.5 0 0 0 2.291 2.291L14.25 12l-2.146.813a4.5 4.5 0 0 0-2.291 2.291ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.456-2.456L14.25 6l1.035-.259a3.375 3.375 0 0 0 2.456-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z" />
        </svg>
    );
}

function LightningBoltIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>
    );
}

function DocumentTextIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    );
}

function AcademicCapIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
    );
}

const features = [
    {
        icon: SparklesIcon,
        title: 'Riset Topik Otomatis',
        description: 'AI menganalisis tren dan merekomendasikan judul serta angle ebook yang paling menjual di niche-mu.',
    },
    {
        icon: DocumentTextIcon,
        title: 'Outline Terstruktur',
        description: 'Hasilkan kerangka bab yang logis dan runtut. Kerangka ebook-mu siap dikembangkan tanpa pusing memulainya.',
    },
    {
        icon: LightningBoltIcon,
        title: 'Drafting Super Cepat',
        description: 'Hempaskan writer\'s block. Biarkan AI merangkai draft awal yang rapi sebelum kamu poles dengan gaya bahasamu.',
    },
    {
        icon: AcademicCapIcon,
        title: 'Siap Dipoles & Dijual',
        description: 'Output teks yang terstruktur bisa langsung kamu ekspor ke Canva, Word, atau Notion untuk proses desain akhir.',
    },
];

const faqItems = [
    {
        question: 'Apakah Ebook Generator AI ini bisa dipakai gratis?',
        answer: 'Tentu! Kamu bisa mencoba beberapa generasi pertama secara gratis. Untuk riset dan output tanpa batasan, tersedia opsi paket premium.',
    },
    {
        question: 'Apakah tulisan hasil AI ini akan terdeteksi plagiat?',
        answer: 'Hasil tulisan bersifat unik karena di-generate berdasarkan input unik darimu. Namun kami sangat menyarankan untuk merevisi dan menambahkan studi kasus nyata agar lebih berbobot.',
    },
    {
        question: 'Idealnya untuk ebook dengan tebal berapa halaman?',
        answer: 'Tool ini sangat optimal untuk ebook ringkas seperti lead magnet, panduan praktis, atau workbook (10-30 halaman) karena fokus pada kepadatan isi (daging semua).',
    },
];

export default function EbookGenerator({ auth }) {
    const canonical = route('ebook-generator');
    const externalUrl = 'https://ai.otakatikin.com';

    return (
        <>
            <Seo
                title="AI Ebook Generator: Buat Outline & Draft Otomatis"
                description="Ubah ide menjadi ebook hanya dalam hitungan menit. Ebook Generator AI dari OtakAtikin membantumu meriset topik, menyusun outline, hingga menulis draft instan."
                canonical={canonical}
                keywords={[
                    'ai ebook generator',
                    'ebook generator ai',
                    'generator ebook',
                    'ai.otakatikin.com',
                    'buat ebook dengan ai',
                    'outline ebook ai',
                    'draft ebook ai',
                    'cara membuat ebook',
                    'tools ai penulis',
                ]}
                schema={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'SoftwareApplication',
                        name: 'OtakAtikin AI Ebook Generator',
                        applicationCategory: 'BusinessApplication',
                        operatingSystem: 'Any',
                        url: externalUrl,
                        provider: {
                            '@type': 'Organization',
                            name: 'OtakAtikin',
                        },
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: faqItems.map((item) => ({
                            '@type': 'Question',
                            name: item.question,
                            acceptedAnswer: {
                                '@type': 'Answer',
                                text: item.answer,
                            },
                        })),
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'BreadcrumbList',
                        itemListElement: [
                            {
                                '@type': 'ListItem',
                                position: 1,
                                name: 'Beranda',
                                item: typeof window !== 'undefined' ? `${window.location.origin}/` : '/',
                            },
                            {
                                '@type': 'ListItem',
                                position: 2,
                                name: 'AI Ebook Generator',
                                item: canonical,
                            },
                        ],
                    },
                ]}
            />

            <div className="public-shell">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="public-hero-shell relative flex items-center justify-center overflow-hidden">
                    {/* Base background */}
                    <div className="absolute inset-0 bg-white dark:bg-black" />
                    
                    {/* Grid Pattern */}
                    <div 
                        className="absolute inset-0 opacity-30 dark:opacity-100"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                        }}
                    />
                    <div 
                        className="absolute inset-0 hidden dark:block"
                        style={{
                            backgroundImage: `
                                linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
                                linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)
                            `,
                            backgroundSize: '50px 50px',
                            maskImage: 'radial-gradient(ellipse 35% 35% at 50% 45%, rgba(0,0,0,0.8) 0%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(ellipse 35% 35% at 50% 45%, rgba(0,0,0,0.8) 0%, transparent 70%)',
                        }}
                    />

                    {/* Moving Spotlight Container */}
                    <div className="absolute inset-0 overflow-hidden dark:opacity-100 opacity-60">
                        {/* Spotlight 1 */}
                        <div 
                            className="spotlight-move-1 absolute w-[600px] h-[600px] rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(16,163,127,0.2) 0%, rgba(16,163,127,0.08) 40%, transparent 70%)',
                                filter: 'blur(60px)',
                                top: '10%',
                                left: '20%',
                            }}
                        />
                        
                        {/* Spotlight 2 */}
                        <div 
                            className="spotlight-move-2 absolute w-[500px] h-[500px] rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(16,163,127,0.18) 0%, rgba(16,163,127,0.06) 40%, transparent 70%)',
                                filter: 'blur(50px)',
                                top: '30%',
                                right: '10%',
                            }}
                        />
                        
                        {/* Spotlight 3 */}
                        <div 
                            className="spotlight-move-3 absolute w-[400px] h-[400px] rounded-full pointer-events-none"
                            style={{
                                background: 'radial-gradient(circle, rgba(16,163,127,0.15) 0%, transparent 60%)',
                                filter: 'blur(40px)',
                                bottom: '20%',
                                left: '40%',
                            }}
                        />
                    </div>

                    <div className="public-container relative pb-16 pt-24 text-center sm:pb-20 sm:pt-28 lg:py-32">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10a37f] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10a37f]"></span>
                            </span>
                            <span className="text-[13px] text-gray-600 dark:text-white/60 font-medium">Panduan, Ebook, hingga Produk Digital</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-[clamp(36px,6vw,68px)] font-semibold leading-[1.1] tracking-[-0.02em] max-w-[1000px] mx-auto text-balance">
                            <span className="text-gray-900 dark:text-white">Tuliskan judul, semua beres dari outline, isi </span>
                            <span className="text-[#10a37f]">
                                sampai cover.
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="mt-6 text-[18px] sm:text-[20px] text-gray-500 dark:text-white/50 font-normal leading-relaxed max-w-xl mx-auto">
                            Bukan cuma buat ebook biasa, tapi semua bentuk produk digital bisa dilakukan. Masukkan ide atau topikmu, biarkan AI memproses semuanya dalam hitungan menit.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href={externalUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="public-mobile-cta group inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                            >
                                Coba Gratis Sekarang
                                <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                            </a>
                            <Link
                                href={route('assets.index')}
                                className="public-mobile-cta group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-transparent px-6 py-3 text-[15px] font-medium text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                            >
                                <DocumentTextIcon className="h-5 w-5" />
                                Lihat Contoh Output
                            </Link>
                        </div>
                    </div>

                    {/* Bottom Gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />
                    
                    {/* Top vignette */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/50 to-transparent dark:from-black/50" />
                </section>

                {/* Features Section */}
                <section className="relative public-section">
                    <div className="public-container">
                        <div className="text-center mb-16">
                            <h2 className="text-[32px] sm:text-[40px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em]">
                                Jauh lebih cepat, tetap berkualitas
                            </h2>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-gray-500 dark:text-white/40 font-normal">
                                Dirancang agar kreator tidak mandek di layar kosong (blank screen syndrome).
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all duration-300"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-[#10a37f]/20 transition-colors">
                                        <feature.icon className="h-5 w-5 text-gray-600 dark:text-white/60 group-hover:text-[#10a37f] transition-colors" />
                                    </div>
                                    <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[14px] text-gray-500 dark:text-white/40 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Workflow Section */}
                <section className="relative public-section border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="public-container">
                        <div className="grid lg:grid-cols-[1.15fr_0.85fr] gap-8 items-stretch">
                            <div className="relative rounded-3xl border border-gray-200 dark:border-white/[0.08] bg-gradient-to-br from-gray-100 to-white dark:from-white/[0.04] dark:to-white/[0.01] p-8 sm:p-10 overflow-hidden">
                                <div
                                    className="absolute inset-0 opacity-50"
                                    style={{
                                        background: 'radial-gradient(circle at top left, rgba(16,163,127,0.12) 0%, transparent 50%)',
                                    }}
                                />
                                <div className="relative max-w-2xl">
                                    <div className="inline-flex items-center gap-2 rounded-full border border-[#10a37f]/20 bg-[#10a37f]/10 px-3 py-1 text-[12px] font-medium text-[#10a37f]">
                                        <SparklesIcon className="h-4 w-4" />
                                        ai.otakatikin.com
                                    </div>
                                    <h2 className="mt-5 text-[30px] sm:text-[40px] font-semibold tracking-[-0.02em] text-gray-900 dark:text-white leading-tight">
                                        Dari satu kalimat sederhana menjadi buku panduan lengkap.
                                    </h2>
                                    <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-gray-600 dark:text-white/55">
                                        Cukup ketik topik yang ingin kamu bahas. Misalnya: <strong>"Panduan diet defisit kalori untuk pekerja kantoran"</strong>. Sistem AI kami akan mengubahnya menjadi daftar isi yang solid, lalu mengeksekusi tulisannya untukmu.
                                    </p>
                                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                        <a
                                            href={externalUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium text-white bg-[#10a37f] hover:bg-[#0d8b6c] rounded-xl transition-colors"
                                        >
                                            Mulai Generate Sekarang
                                            <ArrowRightIcon className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] p-8 sm:p-10">
                                <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">
                                    Alur Kerja (Workflow)
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {[
                                        'Masukkan niche atau ide utama dari ebook-mu',
                                        'Review & pilih rekomendasi judul dari AI',
                                        'Setujui atau modifikasi outline bab yang dibuatkan',
                                        'AI menuliskan draf kasar (rough draft) setiap babnya',
                                        'Salin hasilnya untuk didesain di Canva',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="mt-0.5 h-6 w-6 rounded-full bg-[#10a37f]/15 text-[#10a37f] flex items-center justify-center text-[12px] font-semibold flex-shrink-0">
                                                {index + 1}
                                            </div>
                                            <p className="text-[14px] leading-relaxed text-gray-600 dark:text-white/60">
                                                {item}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Section */}
                <section className="relative public-section border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="public-container">
                        <div className="grid lg:grid-cols-[0.85fr_1.15fr] gap-16 items-start">
                            <div>
                                <h2 className="text-[32px] sm:text-[40px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em] leading-tight">
                                    Pertanyaan Umum
                                </h2>
                                <p className="mt-4 text-[16px] sm:text-[18px] text-gray-500 dark:text-white/40 leading-relaxed">
                                    Hal yang sering ditanyakan sebelum mulai menggunakan Ebook Generator AI.
                                </p>
                            </div>
                            <div className="grid gap-4">
                                {faqItems.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="p-6 sm:p-8 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06]"
                                    >
                                        <h3 className="text-[16px] sm:text-[18px] font-semibold text-gray-900 dark:text-white">
                                            {item.question}
                                        </h3>
                                        <p className="mt-3 text-[15px] leading-relaxed text-gray-600 dark:text-white/50">
                                            {item.answer}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section - OpenAI Style */}
                <section className="relative public-section">
                    <div className="public-container-sm">
                        <div className="relative rounded-2xl bg-gray-100 dark:bg-[#0a0a0a] border border-gray-200 dark:border-white/[0.08] p-10 sm:p-16 overflow-hidden">
                            {/* Subtle gradient overlay */}
                            <div 
                                className="absolute inset-0 opacity-50"
                                style={{
                                    background: 'radial-gradient(ellipse at top, rgba(16,163,127,0.08) 0%, transparent 60%)',
                                }}
                            />
                            
                            <div className=" relative text-center">
                                <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em] leading-[1.2]">
                                    Waktunya rilis ebook pertamamu.
                                </h2>
                                <p className="mt-4 text-[15px] sm:text-[17px] text-gray-600 dark:text-white/50 max-w-md mx-auto leading-relaxed">
                                    Jangan biarkan idemu menumpuk. Gunakan AI untuk mempercepat alur kerja pembuatan produk digital.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                    <a
                                        href={externalUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="public-mobile-cta inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-[15px] font-medium text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                    >
                                        Mulai Gunakan AI
                                        <ArrowRightIcon className="h-4 w-4" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="public-container py-16 sm:py-24">
                        <a
                            href={externalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block"
                        >
                            <div className="relative h-[88px] overflow-hidden sm:h-[140px] lg:h-[180px]">
                                <span className="absolute inset-0 flex items-center justify-center text-[82px] font-bold leading-none tracking-[-0.04em] text-gray-900 transition-all duration-500 group-hover:-translate-y-10 group-hover:opacity-0 dark:text-white/[0.8] sm:text-[130px] lg:text-[245px]">
                                    OtakAtikin
                                </span>
                                <span className="absolute inset-0 flex items-center justify-center text-[34px] font-bold leading-none tracking-[-0.04em] text-gray-900 opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:text-white sm:text-[70px] lg:text-[150px]">
                                    Mulai Sekarang →
                                </span>
                            </div>
                        </a>
                    </div>
                </section>

                <PublicFooter />
            </div>

            <style>{`
                @keyframes moveSpotlight1 {
                    0% { transform: translate(0, 0); }
                    25% { transform: translate(200px, 100px); }
                    50% { transform: translate(100px, 200px); }
                    75% { transform: translate(-100px, 50px); }
                    100% { transform: translate(0, 0); }
                }
                
                @keyframes moveSpotlight2 {
                    0% { transform: translate(0, 0); }
                    33% { transform: translate(-150px, 150px); }
                    66% { transform: translate(-200px, -50px); }
                    100% { transform: translate(0, 0); }
                }
                
                @keyframes moveSpotlight3 {
                    0% { transform: translate(0, 0); }
                    50% { transform: translate(150px, -100px); }
                    100% { transform: translate(0, 0); }
                }
                
                .spotlight-move-1 { animation: moveSpotlight1 15s ease-in-out infinite; }
                .spotlight-move-2 { animation: moveSpotlight2 20s ease-in-out infinite; }
                .spotlight-move-3 { animation: moveSpotlight3 12s ease-in-out infinite; }
            `}</style>
        </>
    );
}
