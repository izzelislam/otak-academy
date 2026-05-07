import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import PublicFooter from '@/Components/PublicFooter';
import Seo from '@/Components/Seo';

function AcademicCapIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
        </svg>
    );
}

function ArrowRightIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
    );
}

function BookOpenIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
        </svg>
    );
}

function VideoCameraIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5 4.72-4.72a.75.75 0 0 1 1.28.53v11.38a.75.75 0 0 1-1.28.53l-4.72-4.72M4.5 18.75h9a2.25 2.25 0 0 0 2.25-2.25v-9a2.25 2.25 0 0 0-2.25-2.25h-9A2.25 2.25 0 0 0 2.25 7.5v9a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    );
}

function DocumentIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
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

const features = [
    {
        icon: VideoCameraIcon,
        title: 'Course & Video Class',
        description: 'Pelajari skill baru lewat course video terstruktur, praktikal, dan relevan dengan kebutuhan industri.',
    },
    {
        icon: BookOpenIcon,
        title: 'Blog, Ebook & Resources',
        description: 'Temukan artikel, ebook, dan resources gratis untuk mempercepat proses belajar mandiri.',
    },
    {
        icon: DocumentIcon,
        title: 'Produk Digital & Ebook',
        description: 'Download ebook, template, tools, dan produk digital premium yang siap pakai untuk projekmu.',
    },
    {
        icon: SparklesIcon,
        title: 'Ebook Generator AI',
        description: 'Buat draft ebook, outline, dan ide konten lebih cepat lewat tool AI OtakAtikin.',
    },
];

export default function Welcome({ auth, courses = [] }) {
    const canonical = typeof window !== 'undefined' ? `${window.location.origin}/` : '/';

    return (
        <>
            <Seo
                title="Ebook, Produk Digital, Course & Ebook Generator AI"
                description="OtakAtikin menyediakan ebook, produk digital, course online, artikel belajar, dan ebook generator AI untuk developer, kreator, dan pebisnis digital."
                canonical={canonical}
                keywords={[
                    'ebook',
                    'ebook digital',
                    'produk digital',
                    'course online',
                    'kursus online',
                    'ebook generator ai',
                    'ai.otakatikin.com',
                    'template digital',
                ]}
                schema={[
                    {
                        '@context': 'https://schema.org',
                        '@type': 'WebSite',
                        name: 'OtakAtikin',
                        url: canonical,
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'EducationalOrganization',
                        name: 'OtakAtikin',
                        url: canonical,
                    },
                    {
                        '@context': 'https://schema.org',
                        '@type': 'Service',
                        name: 'OtakAtikin Ebook Generator AI',
                        provider: {
                            '@type': 'Organization',
                            name: 'OtakAtikin',
                        },
                        areaServed: 'ID',
                        serviceType: 'AI Ebook Generator',
                        url: 'https://ai.otakatikin.com',
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
                            <span className="text-[13px] text-gray-600 dark:text-white/60 font-medium">Platform ebook, produk digital, course, dan AI generator</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-[clamp(40px,8vw,80px)] font-semibold leading-[1.1] tracking-[-0.02em] max-w-4xl mx-auto">
                            <span className="text-gray-900 dark:text-white">Ebook, course,</span>
                            <br />
                            <span className="text-[#10a37f]">
                                produk digital, & AI tools
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="mt-6 text-[18px] sm:text-[20px] text-gray-500 dark:text-white/50 font-normal leading-relaxed max-w-xl mx-auto">
                            Akses course online, ebook premium, produk digital siap pakai, artikel blog, dan ebook generator AI untuk membangun skill sekaligus output yang bisa langsung dijual atau dipakai.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <>
                                    <Link
                                        href={route('assets.index')}
                                        className="public-mobile-cta group inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                    >
                                        Lihat Ebook & Produk Digital
                                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <a
                                        href="https://ai.otakatikin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="public-mobile-cta group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-transparent px-6 py-3 text-[15px] font-medium text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                                    >
                                        <SparklesIcon className="h-5 w-5" />
                                        Buka Ebook Generator AI
                                    </a>
                                </>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="public-mobile-cta group inline-flex items-center justify-center gap-2 rounded-xl bg-black px-6 py-3 text-[15px] font-medium text-white transition-all hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                    >
                                        Mulai belajar gratis
                                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <a
                                        href="https://ai.otakatikin.com"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="public-mobile-cta group inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-transparent px-6 py-3 text-[15px] font-medium text-gray-600 transition-all hover:border-gray-300 hover:text-gray-900 dark:border-white/10 dark:bg-white/5 dark:text-white/80 dark:hover:border-white/20 dark:hover:bg-white/10 dark:hover:text-white"
                                    >
                                        <SparklesIcon className="h-5 w-5" />
                                        Coba Ebook Generator AI
                                    </a>
                                </>
                            )}
                        </div>

                        {/* Stats */}
                        {/* <div className="mt-20 pt-10 border-t border-gray-200 dark:border-white/10">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                {[
                                    { value: '100+', label: 'Kursus & Blog' },
                                    { value: '50+', label: 'Produk Digital' },
                                    { value: '5K+', label: 'Member Aktif' },
                                    { value: '4.8', label: 'Rating' },
                                ].map((stat, index) => (
                                    <div key={index} className="text-center">
                                        <div className="text-[28px] sm:text-[32px] font-semibold text-gray-900 dark:text-white tracking-tight">
                                            {stat.value}
                                        </div>
                                        <div className="mt-1 text-[14px] text-gray-500 dark:text-white/40 font-medium">
                                            {stat.label}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div> */}
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
                                Semua yang kamu butuhkan
                            </h2>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-gray-500 dark:text-white/40 font-normal">
                                Fokus pada pertumbuhan skill dan produksi aset digital yang bisa langsung dipakai
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

                {/* Why Section */}
                <section className="relative public-section border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="public-container">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-[32px] sm:text-[40px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em] leading-tight">
                                    Kenapa memilih
                                    <br />
                                    <span className="text-[#10a37f]">OtakAtikin?</span>
                                </h2>
                                <p className="mt-6 text-[16px] sm:text-[18px] text-gray-500 dark:text-white/40 leading-relaxed">
                                    Platform all-in-one untuk belajar dan berkembang. Akses course, ebook, produk digital, blog, dan tool AI dalam satu ekosistem.
                                </p>

                                <div className="mt-10 space-y-4">
                                    {[
                                        'Course online dan video class berkualitas',
                                        'Ebook, template, dan produk digital premium',
                                        'Ebook generator AI untuk riset, outline, dan draft',
                                        'Akses konten seumur hidup',
                                        'Blog praktikal dan resources eksklusif',
                                        'Workflow belajar ke output digital yang lebih cepat',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#10a37f]/20 flex items-center justify-center">
                                                <svg className="h-3 w-3 text-[#10a37f]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-[15px] text-gray-600 dark:text-white/60">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square rounded-3xl bg-gradient-to-br from-gray-100 to-gray-50 dark:from-white/[0.04] dark:to-white/[0.01] border border-gray-200 dark:border-white/[0.06] p-8 flex flex-col items-center justify-center">
                                    <div 
                                        className="absolute inset-0 rounded-3xl opacity-50"
                                        style={{
                                            background: 'radial-gradient(circle at 30% 30%, rgba(16,163,127,0.15) 0%, transparent 50%)',
                                        }}
                                    />
                                    <div className="relative">
                                        <div className="h-20 w-20 rounded-2xl bg-[#10a37f] flex items-center justify-center mb-6">
                                            <AcademicCapIcon className="h-10 w-10 text-white" />
                                        </div>
                                        <div className="text-center">
                                            <div className="text-[30px] font-semibold text-gray-900 dark:text-white tracking-tight">Belajar, bikin, lalu jual lebih cepat</div>
                                            <div className="text-[16px] text-gray-500 dark:text-white/40">Dari course dan ebook sampai produk digital dan generator AI</div>
                                            {/* <div className="text-[56px] font-semibold text-gray-900 dark:text-white tracking-tight">Kursus Degan Kualitas Tinggi</div> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

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
                                        Ebook Generator AI untuk riset, outline, dan draft lebih cepat
                                    </h2>
                                    <p className="mt-4 text-[16px] sm:text-[18px] leading-relaxed text-gray-600 dark:text-white/55">
                                        Pakai ebook generator dari OtakAtikin untuk bantu menyusun ide, judul, kerangka isi, dan draft awal ebook sebelum masuk tahap editing, desain, dan distribusi.
                                    </p>
                                    <div className="mt-8 flex flex-col sm:flex-row gap-3">
                                        <a
                                            href="https://ai.otakatikin.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium text-white bg-[#10a37f] hover:bg-[#0d8b6c] rounded-xl transition-colors"
                                        >
                                            Buka Ebook Generator AI
                                            <ArrowRightIcon className="h-4 w-4" />
                                        </a>
                                        <Link
                                            href={route('assets.index')}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-[14px] font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 dark:text-white/80 dark:hover:text-white dark:border-white/10 dark:hover:border-white/20 rounded-xl transition-colors"
                                        >
                                            Lihat Ebook & Produk Digital
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            <div className="rounded-3xl border border-gray-200 dark:border-white/[0.08] bg-gray-50 dark:bg-white/[0.02] p-8 sm:p-10">
                                <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white">
                                    Alur yang ditonjolkan OtakAtikin
                                </h3>
                                <div className="mt-6 space-y-4">
                                    {[
                                        'Belajar lewat course dan artikel praktikal',
                                        'Pakai ebook generator untuk mempercepat draft',
                                        'Download ebook, template, dan produk digital siap pakai',
                                        'Ulangi workflow sampai output kamu lebih cepat jadi',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-start gap-3">
                                            <div className="mt-0.5 h-6 w-6 rounded-full bg-[#10a37f]/15 text-[#10a37f] flex items-center justify-center text-[12px] font-semibold">
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

                {/* Testimonials */}
                <section className="relative public-section border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="public-container">
                        <div className="text-center mb-16">
                            <h2 className="text-[32px] sm:text-[40px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em]">
                                Apa kata mereka
                            </h2>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-gray-500 dark:text-white/40">
                                Para member sudah merasakan manfaatnya
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {[
                                {
                                    name: 'Budi Santoso',
                                    role: 'Web Developer',
                                    content: 'Platform terbaik untuk belajar programming. Materinya lengkap dan mudah dipahami!',
                                },
                                {
                                    name: 'Siti Rahayu',
                                    role: 'UI/UX Designer',
                                    content: 'Mentor-mentornya sangat helpful. Saya bisa langsung praktek dan dapat feedback.',
                                },
                                {
                                    name: 'Ahmad Fauzi',
                                    role: 'Data Analyst',
                                    content: 'Kursusnya up-to-date dengan industri. Worth every penny!',
                                },
                            ].map((testimonial, index) => (
                                <div
                                    key={index}
                                    className="p-6 rounded-2xl bg-gray-50 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] hover:bg-gray-100 dark:hover:bg-white/[0.04] hover:border-gray-300 dark:hover:border-white/[0.1] transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 rounded-full bg-[#10a37f]/20 flex items-center justify-center text-[#10a37f] font-semibold text-[14px]">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-semibold text-gray-900 dark:text-white">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-[13px] text-gray-500 dark:text-white/40">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[14px] text-gray-600 dark:text-white/50 leading-relaxed">
                                        "{testimonial.content}"
                                    </p>
                                    <div className="mt-4 flex gap-0.5">
                                        {[...Array(5)].map((_, i) => (
                                            <svg key={i} className="h-4 w-4 text-[#10a37f]" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {courses.length > 0 && (
                    <section className="relative public-section border-t border-gray-200 dark:border-white/[0.06]">
                        <div className="public-container">
                            <div className="flex items-end justify-between mb-10">
                                <div>
                                    <h2 className="text-[32px] sm:text-[40px] font-semibold text-gray-900 dark:text-white tracking-[-0.02em]">
                                        Kelas Online
                                    </h2>
                                    <p className="mt-3 text-[16px] sm:text-[18px] text-gray-500 dark:text-white/40">
                                        Pelajari skill baru lewat kelas terstruktur dan praktikal
                                    </p>
                                </div>
                                <Link
                                    href={route('kelas.index')}
                                    className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 dark:text-white/80 dark:hover:text-white dark:border-white/10 dark:hover:border-white/20 rounded-xl transition-colors"
                                >
                                    Lihat Semua Kelas
                                    <ArrowRightIcon className="h-4 w-4" />
                                </Link>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                                {courses.map((course) => (
                                    <Link
                                        key={course.id}
                                        href={route('kelas.show', course.slug)}
                                        className="group block rounded-2xl border border-gray-200 dark:border-white/[0.08] bg-white dark:bg-white/[0.02] overflow-hidden hover:border-[#10a37f]/30 dark:hover:border-[#10a37f]/30 transition-all hover:shadow-lg hover:shadow-[#10a37f]/5"
                                    >
                                        <div className="aspect-video bg-gray-100 dark:bg-white/[0.04] relative overflow-hidden">
                                            {course.thumbnail ? (
                                                <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center">
                                                    <AcademicCapIcon className="w-12 h-12 text-gray-300 dark:text-white/20" />
                                                </div>
                                            )}
                                            {course.access_type === 'premium' && (
                                                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500/90 backdrop-blur-sm text-white text-[11px] font-semibold">
                                                    Premium
                                                </div>
                                            )}
                                        </div>
                                        <div className="p-5">
                                            <h3 className="text-[16px] font-semibold text-gray-900 dark:text-white line-clamp-2 group-hover:text-[#10a37f] transition-colors">
                                                {course.title}
                                            </h3>
                                            {course.description && (
                                                <div className="mt-2 text-[13px] text-gray-500 dark:text-white/40 line-clamp-2 [&>*]:m-0" dangerouslySetInnerHTML={{ __html: course.description }} />
                                            )}
                                            <div className="mt-4 flex items-center gap-4 text-[12px] text-gray-400 dark:text-white/30">
                                                <span className="flex items-center gap-1">
                                                    <BookOpenIcon className="w-3.5 h-3.5" />
                                                    {course.sessions_count || 0} materi
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                                                    {course.enrolled_users_count || 0} siswa
                                                </span>
                                            </div>
                                            {course.access_type === 'premium' && course.price > 0 && (
                                                <div className="mt-3 text-[15px] font-bold text-amber-600 dark:text-amber-400">
                                                    Rp {new Intl.NumberFormat('id-ID').format(course.price)}
                                                </div>
                                            )}
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            <div className="mt-8 text-center sm:hidden">
                                <Link
                                    href={route('kelas.index')}
                                    className="inline-flex items-center gap-2 px-5 py-2.5 text-[14px] font-medium text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 dark:text-white/80 dark:hover:text-white dark:border-white/10 dark:hover:border-white/20 rounded-xl transition-colors"
                                >
                                    Lihat Semua Kelas
                                    <ArrowRightIcon className="h-4 w-4" />
                                </Link>
                            </div>
                        </div>
                    </section>
                )}

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
                                    Mulai dari course, lanjut ke ebook dan AI workflow
                                </h2>
                                <p className="mt-4 text-[15px] sm:text-[17px] text-gray-600 dark:text-white/50 max-w-md mx-auto leading-relaxed">
                                    Bangun skill lewat course, dapatkan ebook dan produk digital, lalu percepat produksi konten dengan ebook generator AI.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                    {auth.user ? (
                                        <>
                                            <Link
                                                href={route('assets.index')}
                                                className="public-mobile-cta inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                            >
                                                Explore Ebook & Produk Digital
                                                <ArrowRightIcon className="h-4 w-4" />
                                            </Link>
                                            <a
                                                href="https://ai.otakatikin.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="public-mobile-cta inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-white/60 dark:hover:text-white"
                                            >
                                                Coba Ebook Generator AI
                                            </a>
                                        </>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="public-mobile-cta inline-flex items-center justify-center gap-2 rounded-lg bg-black px-5 py-2.5 text-[14px] font-medium text-white transition-colors hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                            >
                                                Daftar untuk akses course
                                                <ArrowRightIcon className="h-4 w-4" />
                                            </Link>
                                            <a
                                                href="https://ai.otakatikin.com"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="public-mobile-cta inline-flex items-center justify-center px-5 py-2.5 text-[14px] font-medium text-gray-600 transition-colors hover:text-gray-900 dark:text-white/60 dark:hover:text-white"
                                            >
                                                Coba Ebook Generator AI
                                            </a>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="border-t border-gray-200 dark:border-white/[0.06]">
                    <div className="public-container py-16 sm:py-24">
                        <Link
                            href={auth.user ? route('member.classes.index') : route('register')}
                            className="group block"
                        >
                            <div className="relative overflow-hidden h-[88px] sm:h-[140px] lg:h-[180px]">
                                <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[84px] font-bold leading-none tracking-[-0.04em] text-gray-900 transition-all duration-500 group-hover:-translate-y-10 group-hover:opacity-0 dark:text-white/[0.8] sm:text-[130px] lg:text-[245px]">
                                    OtaKAtikin
                                </span>
                                <span className="absolute inset-0 flex items-center justify-center whitespace-nowrap text-[34px] font-bold leading-none tracking-[-0.04em] text-gray-900 opacity-0 translate-y-10 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 dark:text-white sm:text-[70px] lg:text-[150px]">
                                    Mulai Sekarang →
                                </span>
                            </div>
                        </Link>
                    </div>
                </section>

                <PublicFooter />
            </div>

            <style>{`
                @keyframes moveSpotlight1 {
                    0% {
                        transform: translate(0, 0);
                    }
                    25% {
                        transform: translate(200px, 100px);
                    }
                    50% {
                        transform: translate(100px, 200px);
                    }
                    75% {
                        transform: translate(-100px, 50px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
                
                @keyframes moveSpotlight2 {
                    0% {
                        transform: translate(0, 0);
                    }
                    33% {
                        transform: translate(-150px, 150px);
                    }
                    66% {
                        transform: translate(-200px, -50px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
                
                @keyframes moveSpotlight3 {
                    0% {
                        transform: translate(0, 0);
                    }
                    50% {
                        transform: translate(150px, -100px);
                    }
                    100% {
                        transform: translate(0, 0);
                    }
                }
                
                .spotlight-move-1 {
                    animation: moveSpotlight1 15s ease-in-out infinite;
                }
                
                .spotlight-move-2 {
                    animation: moveSpotlight2 20s ease-in-out infinite;
                }
                
                .spotlight-move-3 {
                    animation: moveSpotlight3 12s ease-in-out infinite;
                }
            `}</style>
        </>
    );
}
