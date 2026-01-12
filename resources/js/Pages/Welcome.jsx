import { Head, Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';

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

function PlayCircleIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z" />
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

function UsersIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
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

const features = [
    {
        icon: VideoCameraIcon,
        title: 'Video Learning',
        description: 'Akses ratusan video pembelajaran berkualitas HD kapan saja.',
    },
    {
        icon: BookOpenIcon,
        title: 'E-Book & Resources',
        description: 'Download materi dan e-book untuk belajar offline.',
    },
    {
        icon: UsersIcon,
        title: 'Live Sessions',
        description: 'Ikuti sesi live interaktif langsung dengan mentor.',
    },
    {
        icon: DocumentIcon,
        title: 'Sertifikat',
        description: 'Dapatkan sertifikat resmi setelah menyelesaikan kursus.',
    },
];

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="ECourse - Learn with Experts" />
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
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

                    <div className="relative max-w-[1200px] mx-auto px-6 py-32 text-center">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/10 mb-8">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10a37f] opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#10a37f]"></span>
                            </span>
                            <span className="text-[13px] text-gray-600 dark:text-white/60 font-medium">Platform pembelajaran terpercaya</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-[clamp(40px,8vw,80px)] font-semibold leading-[1.1] tracking-[-0.02em] max-w-4xl mx-auto">
                            <span className="text-gray-900 dark:text-white">Belajar skill baru</span>
                            <br />
                            <span className="text-[#10a37f]">
                                bersama expert
                            </span>
                        </h1>

                        {/* Subheadline */}
                        <p className="mt-6 text-[18px] sm:text-[20px] text-gray-500 dark:text-white/50 font-normal leading-relaxed max-w-xl mx-auto">
                            Platform e-learning dengan kurikulum terstruktur dan mentor berpengalaman untuk membantu kamu mencapai karir impian.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            {auth.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium text-white bg-black hover:bg-black/90 dark:text-black dark:bg-white dark:hover:bg-white/90 rounded-xl transition-all"
                                >
                                    Masuk Dashboard
                                    <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('register')}
                                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium text-white bg-black hover:bg-black/90 dark:text-black dark:bg-white dark:hover:bg-white/90 rounded-xl transition-all"
                                    >
                                        Mulai belajar gratis
                                        <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                                    </Link>
                                    <Link
                                        href={route('login')}
                                        className="group inline-flex items-center justify-center gap-2 px-6 py-3 text-[15px] font-medium text-gray-600 hover:text-gray-900 bg-transparent border border-gray-200 hover:border-gray-300 dark:text-white/80 dark:hover:text-white dark:bg-white/5 dark:hover:bg-white/10 dark:border-white/10 dark:hover:border-white/20 rounded-xl transition-all"
                                    >
                                        <PlayCircleIcon className="h-5 w-5" />
                                        Lihat demo
                                    </Link>
                                </>
                            )}
                        </div>

                        {/* Stats */}
                        <div className="mt-20 pt-10 border-t border-gray-200 dark:border-white/10">
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
                                {[
                                    { value: '500+', label: 'Video materi' },
                                    { value: '50+', label: 'Kursus' },
                                    { value: '10K+', label: 'Siswa aktif' },
                                    { value: '4.9', label: 'Rating' },
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
                        </div>
                    </div>

                    {/* Bottom Gradient fade */}
                    <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-white via-white/80 to-transparent dark:from-black dark:via-black/80" />
                    
                    {/* Top vignette */}
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white/50 to-transparent dark:from-black/50" />
                </section>

                {/* Features Section */}
                <section className="relative py-24 sm:py-32">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-[32px] sm:text-[40px] font-semibold text-white tracking-[-0.02em]">
                                Semua yang kamu butuhkan
                            </h2>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-white/40 font-normal">
                                Fitur lengkap untuk pengalaman belajar terbaik
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="group p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
                                >
                                    <div className="h-10 w-10 rounded-xl bg-white/[0.06] flex items-center justify-center mb-4 group-hover:bg-[#10a37f]/20 transition-colors">
                                        <feature.icon className="h-5 w-5 text-white/60 group-hover:text-[#10a37f] transition-colors" />
                                    </div>
                                    <h3 className="text-[16px] font-semibold text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-[14px] text-white/40 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Why Section */}
                <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="grid lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-[32px] sm:text-[40px] font-semibold text-white tracking-[-0.02em] leading-tight">
                                    Kenapa memilih
                                    <br />
                                    <span className="text-[#10a37f]">ECourse?</span>
                                </h2>
                                <p className="mt-6 text-[16px] sm:text-[18px] text-white/40 leading-relaxed">
                                    Kami menyediakan pengalaman belajar yang berbeda dengan kurikulum yang dirancang oleh praktisi industri.
                                </p>

                                <div className="mt-10 space-y-4">
                                    {[
                                        'Kurikulum disusun oleh praktisi industri',
                                        'Akses materi seumur hidup',
                                        'Belajar dengan pace sendiri',
                                        'Komunitas learner yang supportive',
                                        'Sertifikat yang diakui industri',
                                    ].map((item, index) => (
                                        <div key={index} className="flex items-center gap-3">
                                            <div className="flex-shrink-0 h-5 w-5 rounded-full bg-[#10a37f]/20 flex items-center justify-center">
                                                <svg className="h-3 w-3 text-[#10a37f]" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <span className="text-[15px] text-white/60">
                                                {item}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="relative">
                                <div className="aspect-square rounded-3xl bg-gradient-to-br from-white/[0.04] to-white/[0.01] border border-white/[0.06] p-8 flex flex-col items-center justify-center">
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
                                            <div className="text-[56px] font-semibold text-white tracking-tight">100+</div>
                                            <div className="text-[16px] text-white/40">Kursus tersedia</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="relative py-24 sm:py-32 border-t border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-[32px] sm:text-[40px] font-semibold text-white tracking-[-0.02em]">
                                Apa kata mereka
                            </h2>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-white/40">
                                Ribuan siswa sudah merasakan manfaatnya
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
                                    className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] hover:border-white/[0.1] transition-all"
                                >
                                    <div className="flex items-center gap-3 mb-4">
                                        <div className="h-10 w-10 rounded-full bg-[#10a37f]/20 flex items-center justify-center text-[#10a37f] font-semibold text-[14px]">
                                            {testimonial.name.charAt(0)}
                                        </div>
                                        <div>
                                            <div className="text-[14px] font-semibold text-white">
                                                {testimonial.name}
                                            </div>
                                            <div className="text-[13px] text-white/40">
                                                {testimonial.role}
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-[14px] text-white/50 leading-relaxed">
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

                {/* CTA Section - OpenAI Style */}
                <section className="relative py-24 sm:py-32">
                    <div className="max-w-[1000px] mx-auto px-1">
                        <div className="relative rounded-2xl bg-[#0a0a0a] border border-white/[0.08] p-10 sm:p-16 overflow-hidden">
                            {/* Subtle gradient overlay */}
                            <div 
                                className="absolute inset-0 opacity-50"
                                style={{
                                    background: 'radial-gradient(ellipse at top, rgba(16,163,127,0.08) 0%, transparent 60%)',
                                }}
                            />
                            
                            <div className=" relative text-center">
                                <h2 className="text-[28px] sm:text-[36px] lg:text-[42px] font-semibold text-white tracking-[-0.02em] leading-[1.2]">
                                    Mulai belajar hari ini
                                </h2>
                                <p className="mt-4 text-[15px] sm:text-[17px] text-white/50 max-w-md mx-auto leading-relaxed">
                                    Bergabung dengan ribuan learner dan tingkatkan skill kamu bersama mentor berpengalaman.
                                </p>
                                <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium text-black bg-white hover:bg-white/90 rounded-lg transition-colors"
                                        >
                                            Masuk Dashboard
                                            <ArrowRightIcon className="h-4 w-4" />
                                        </Link>
                                    ) : (
                                        <>
                                            <Link
                                                href={route('register')}
                                                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-[14px] font-medium text-black bg-white hover:bg-white/90 rounded-lg transition-colors"
                                            >
                                                Daftar gratis
                                                <ArrowRightIcon className="h-4 w-4" />
                                            </Link>
                                            <Link
                                                href={route('login')}
                                                className="inline-flex items-center justify-center px-5 py-2.5 text-[14px] font-medium text-white/60 hover:text-white transition-colors"
                                            >
                                                Sudah punya akun? Masuk
                                            </Link>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer - OpenAI Style */}
                <footer className="relative border-t border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6">
                        {/* Big text CTA - Main focus */}
                        <div className="py-16 sm:py-24">
                            <Link 
                                href={auth.user ? route('member.classes.index') : route('register')}
                                className="group block"
                            >
                                <div className="relative overflow-hidden h-[100px] sm:h-[150px] lg:h-[180px]">
                                    <span className="absolute inset-0 flex items-center text-[400px] sm:text-[130px] lg:text-[245px] font-bold text-white/[0.80] leading-none tracking-[-0.04em] transition-all duration-500 group-hover:opacity-0 group-hover:-translate-y-10 select-none">
                                        OtaKAtikin
                                    </span>
                                    <span className="absolute inset-0 flex items-center text-[40px] sm:text-[70px] lg:text-[150px] font-bold text-white leading-none tracking-[-0.04em] opacity-0 translate-y-10 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 select-none whitespace-nowrap">
                                        Mulai Sekarang →
                                    </span>
                                </div>
                            </Link>
                        </div>

                        {/* Bottom section */}
                        <div className="py-8 border-t border-white/[0.06]">
                            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
                                {/* Left - Logo & Copyright */}
                                <div className="flex items-center gap-6">
                                    <div className="h-8 w-8 rounded-lg bg-white/10 flex items-center justify-center">
                                        <AcademicCapIcon className="h-5 w-5 text-white/70" />
                                    </div>
                                    <p className="text-[13px] text-white/40">
                                        © {new Date().getFullYear()} OtakAtikin
                                    </p>
                                </div>

                                {/* Center - Links */}
                                <div className="flex flex-wrap items-center gap-6 text-[13px]">
                                    <Link href={route('blog.index')} className="text-white/40 hover:text-white transition-colors">Blog</Link>
                                    <Link href={route('assets.index')} className="text-white/40 hover:text-white transition-colors">Assets</Link>
                                    <Link href={auth.user ? route('member.classes.index') : route('login')} className="text-white/40 hover:text-white transition-colors">Kelas</Link>
                                    <Link href={auth.user ? route('member.courses.index') : route('login')} className="text-white/40 hover:text-white transition-colors">My Courses</Link>
                                    <Link href={route('login')} className="text-white/40 hover:text-white transition-colors">Login</Link>
                                    <Link href={route('register')} className="text-white/40 hover:text-white transition-colors">Register</Link>
                                </div>

                                {/* Right - Social */}
                                <div className="flex items-center gap-4">
                                    <a href="#" className="text-white/30 hover:text-white transition-colors">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                    </a>
                                    <a href="#" className="text-white/30 hover:text-white transition-colors">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>
                                    </a>
                                    <a href="#" className="text-white/30 hover:text-white transition-colors">
                                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </footer>
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
