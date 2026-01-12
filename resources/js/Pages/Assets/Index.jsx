import { Head, Link, router } from '@inertiajs/react';
import { useState, useEffect } from 'react';

function DownloadIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    );
}

function LockIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    );
}

function FileIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
        </svg>
    );
}

function formatFileSize(bytes) {
    if (!bytes) return '-';
    const units = ['B', 'KB', 'MB', 'GB'];
    let unitIndex = 0;
    let size = bytes;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(1)} ${units[unitIndex]}`;
}

function AssetCard({ asset }) {
    return (
        <article className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl overflow-hidden hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300">
            {asset.thumbnail_url ? (
                <Link href={route('assets.show', asset.slug)} className="block aspect-video overflow-hidden">
                    <img 
                        src={asset.thumbnail_url} 
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            ) : (
                <Link href={route('assets.show', asset.slug)} className="block aspect-video overflow-hidden bg-white/[0.02] flex items-center justify-center">
                    <FileIcon className="w-16 h-16 text-white/20" />
                </Link>
            )}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full ${
                        asset.type === 'free' 
                            ? 'text-[#10a37f] bg-[#10a37f]/10' 
                            : 'text-amber-400 bg-amber-400/10'
                    }`}>
                        {asset.type === 'free' ? (
                            <>
                                <DownloadIcon className="w-3 h-3" />
                                Free
                            </>
                        ) : (
                            <>
                                <LockIcon className="w-3 h-3" />
                                Paid
                            </>
                        )}
                    </span>
                    {asset.file_type && (
                        <span className="px-2 py-0.5 text-[10px] font-medium text-white/40 bg-white/[0.05] rounded">
                            {asset.file_type.split('/').pop()?.toUpperCase()}
                        </span>
                    )}
                </div>
                <Link href={route('assets.show', asset.slug)}>
                    <h2 className="text-[18px] font-semibold text-white leading-tight mb-2 group-hover:text-[#10a37f] transition-colors line-clamp-2">
                        {asset.title}
                    </h2>
                </Link>
                {asset.description && (
                    <p className="text-[14px] text-white/50 leading-relaxed mb-4 line-clamp-2">
                        {asset.description}
                    </p>
                )}
                <div className="flex items-center justify-between text-[12px] text-white/40">
                    <span>{formatFileSize(asset.file_size)}</span>
                    <span className="flex items-center gap-1">
                        <DownloadIcon className="w-3.5 h-3.5" />
                        {asset.download_count || 0} downloads
                    </span>
                </div>
            </div>
        </article>
    );
}

function Pagination({ data }) {
    if (!data || !data.links || data.last_page <= 1) return null;

    return (
        <div className="flex justify-center gap-2 mt-12">
            {data.links.map((link, i) => (
                <Link
                    key={i}
                    href={link.url || '#'}
                    preserveScroll
                    className={`px-3 py-2 text-[13px] rounded-lg transition-colors ${
                        link.active
                            ? 'bg-[#10a37f] text-white'
                            : link.url
                            ? 'text-white/60 hover:text-white hover:bg-white/10'
                            : 'text-white/20 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function AssetsIndex({ assets, currentType }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add('dark');
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const items = assets?.data || assets || [];

    const handleTypeFilter = (type) => {
        if (type === currentType) {
            router.get(route('assets.index'));
        } else {
            router.get(route('assets.index'), { type });
        }
    };

    return (
        <>
            <Head title="Downloadable Assets" />
            <div className="min-h-screen bg-black text-white antialiased">
                {/* Header */}
                <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
                    isScrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : ''
                }`}>
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="flex h-16 items-center justify-between">
                            <Link href="/" className="flex items-center gap-2">
                                <div className="h-8 w-8 rounded-lg bg-white flex items-center justify-center">
                                    <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                    </svg>
                                </div>
                                <span className="text-[15px] font-semibold tracking-tight">OtakAtikin</span>
                            </Link>
                            <nav className="flex items-center gap-4">
                                <Link href={route('blog.index')} className="text-[14px] font-medium text-white/70 hover:text-white transition-colors">Blog</Link>
                                <Link href={route('assets.index')} className="text-[14px] font-medium text-white">Assets</Link>
                                <Link href={route('login')} className="px-4 py-2 text-[14px] font-medium text-black bg-white hover:bg-white/90 rounded-lg transition-colors">
                                    Login
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="pt-32 pb-16 border-b border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-[40px] sm:text-[56px] font-semibold tracking-[-0.02em] leading-[1.1]">
                                Downloadable Assets
                            </h1>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-white/50">
                                Template, source code, dan resource digital untuk mempercepat development
                            </p>
                        </div>

                        {/* Type Filter */}
                        <div className="mt-10 flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => handleTypeFilter(null)}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                                    !currentType 
                                        ? 'text-white bg-white/10' 
                                        : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleTypeFilter('free')}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                                    currentType === 'free' 
                                        ? 'text-[#10a37f] bg-[#10a37f]/10' 
                                        : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <DownloadIcon className="w-3.5 h-3.5" />
                                Free
                            </button>
                            <button
                                onClick={() => handleTypeFilter('paid')}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                                    currentType === 'paid' 
                                        ? 'text-amber-400 bg-amber-400/10' 
                                        : 'text-white/60 hover:text-white hover:bg-white/10'
                                }`}
                            >
                                <LockIcon className="w-3.5 h-3.5" />
                                Paid
                            </button>
                        </div>
                    </div>
                </section>

                {/* Assets Grid */}
                <section className="py-16">
                    <div className="max-w-[1200px] mx-auto px-6">
                        {items.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((asset) => (
                                        <AssetCard key={asset.id} asset={asset} />
                                    ))}
                                </div>
                                <Pagination data={assets} />
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/[0.05] flex items-center justify-center">
                                    <FileIcon className="w-8 h-8 text-white/40" />
                                </div>
                                <h3 className="text-[18px] font-semibold text-white mb-2">Belum ada asset</h3>
                                <p className="text-[14px] text-white/50">Asset akan segera tersedia. Stay tuned!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-white/[0.06] py-8">
                    <div className="max-w-[1200px] mx-auto px-6 text-center">
                        <p className="text-[13px] text-white/40">
                            © {new Date().getFullYear()} OtakAtikin. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
