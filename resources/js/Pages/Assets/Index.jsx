import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import Navbar from '@/Components/Navbar';

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

function DownloadIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
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
        <article className="group bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:bg-white/[0.04] dark:hover:border-white/[0.1] transition-all duration-300">
            {asset.thumbnail_url ? (
                <Link href={route('assets.show', asset.slug)} className="block aspect-[4/5] overflow-hidden">
                    <img 
                        src={asset.thumbnail_url} 
                        alt={asset.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            ) : (
                <Link href={route('assets.show', asset.slug)} className="block aspect-[4/5] overflow-hidden bg-gray-100 dark:bg-white/[0.02] flex items-center justify-center">
                    <FileIcon className="w-16 h-16 text-gray-400 dark:text-white/20" />
                </Link>
            )}
            <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-medium rounded-full ${
                        asset.type === 'free' 
                            ? 'text-[#10a37f] bg-[#10a37f]/10' 
                            : 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-400/10'
                    }`}>
                        {asset.type === 'free' ? (
                            <>
                                <DownloadIcon className="w-3 h-3" />
                                Free
                            </>
                        ) : (
                            <>
                                <LockIcon className="w-3 h-3" />
                                Premium
                            </>
                        )}
                    </span>
                    {asset.file_type && (
                        <span className="px-2 py-0.5 text-[10px] font-medium text-gray-500 bg-gray-100 dark:text-white/40 dark:bg-white/[0.05] rounded">
                            {asset.file_type.split('/').pop()?.toUpperCase()}
                        </span>
                    )}
                </div>
                <Link href={route('assets.show', asset.slug)}>
                    <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-[#10a37f] transition-colors line-clamp-2">
                        {asset.title}
                    </h2>
                </Link>
                {asset.description && (
                    <p className="text-[14px] text-gray-500 dark:text-white/50 leading-relaxed mb-4 line-clamp-2">
                        {asset.description}
                    </p>
                )}
                <div className="flex items-center justify-between text-[12px] text-gray-400 dark:text-white/40">
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

function SkeletonCard() {
    return (
        <article className="bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden animate-pulse">
            {/* Thumbnail skeleton */}
            <div className="aspect-[4/5] bg-gray-200 dark:bg-white/[0.05]" />
            <div className="p-6">
                {/* Badges skeleton */}
                <div className="flex items-center gap-2 mb-3">
                    <div className="h-6 w-16 bg-gray-200 dark:bg-white/[0.05] rounded-full" />
                    <div className="h-5 w-12 bg-gray-200 dark:bg-white/[0.05] rounded" />
                </div>
                {/* Title skeleton */}
                <div className="h-6 bg-gray-200 dark:bg-white/[0.05] rounded mb-2 w-3/4" />
                <div className="h-6 bg-gray-200 dark:bg-white/[0.05] rounded mb-4 w-1/2" />
                {/* Description skeleton */}
                <div className="space-y-2 mb-4">
                    <div className="h-4 bg-gray-200 dark:bg-white/[0.05] rounded w-full" />
                    <div className="h-4 bg-gray-200 dark:bg-white/[0.05] rounded w-2/3" />
                </div>
                {/* Footer skeleton */}
                <div className="flex items-center justify-between">
                    <div className="h-3 w-16 bg-gray-200 dark:bg-white/[0.05] rounded" />
                    <div className="h-3 w-24 bg-gray-200 dark:bg-white/[0.05] rounded" />
                </div>
            </div>
        </article>
    );
}


function Pagination({ data, setIsLoading }) {
    if (!data || !data.links || data.last_page <= 1) return null;

    const handlePaginationClick = (e, url) => {
        if (url) {
            e.preventDefault();
            setIsLoading(true);
            router.get(url, {}, {
                onFinish: () => setIsLoading(false)
            });
        }
    };

    return (
        <div className="flex justify-center gap-2 mt-12">
            {data.links.map((link, i) => (
                <a
                    key={i}
                    href={link.url || '#'}
                    onClick={(e) => handlePaginationClick(e, link.url)}
                    className={`px-3 py-2 text-[13px] rounded-lg transition-colors ${
                        link.active
                            ? 'bg-[#10a37f] text-white'
                            : link.url
                            ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 cursor-pointer'
                            : 'text-gray-300 dark:text-white/20 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function AssetsIndex({ assets, currentType, auth }) {
    const items = assets?.data || assets || [];
    const [isLoading, setIsLoading] = useState(false);

    const handleTypeFilter = (type) => {
        setIsLoading(true);
        if (type === currentType) {
            router.get(route('assets.index'), {}, {
                onFinish: () => setIsLoading(false)
            });
        } else {
            router.get(route('assets.index'), { type }, {
                onFinish: () => setIsLoading(false)
            });
        }
    };

    return (
        <>
            <Head title="Produk Digital" />
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="pt-32 pb-16 border-b border-gray-200 dark:border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-[40px] sm:text-[56px] font-semibold tracking-[-0.02em] leading-[1.1]">
                                Produk Digital
                            </h1>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 dark:text-white/50">
                                Template, source code, dan resource digital untuk mempercepat development
                            </p>
                        </div>

                        {/* Type Filter */}
                        <div className="mt-10 flex flex-wrap justify-center gap-2">
                            <button
                                onClick={() => handleTypeFilter(null)}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors ${
                                    !currentType 
                                        ? 'text-gray-900 bg-gray-100 dark:text-white dark:bg-white/10' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                                }`}
                            >
                                Semua
                            </button>
                            <button
                                onClick={() => handleTypeFilter('free')}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                                    currentType === 'free' 
                                        ? 'text-[#10a37f] bg-[#10a37f]/10' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                                }`}
                            >
                                <DownloadIcon className="w-3.5 h-3.5" />
                                Free
                            </button>
                            <button
                                onClick={() => handleTypeFilter('paid')}
                                className={`px-4 py-2 text-[13px] font-medium rounded-full transition-colors flex items-center gap-1.5 ${
                                    currentType === 'paid' 
                                        ? 'text-amber-600 bg-amber-100 dark:text-amber-400 dark:bg-amber-400/10' 
                                        : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                                }`}
                            >
                                <LockIcon className="w-3.5 h-3.5" />
                                Premium
                            </button>
                        </div>
                    </div>
                </section>

                {/* Assets Grid */}
                <section className="py-16">
                    <div className="max-w-[1200px] mx-auto px-6">
                        {isLoading ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {[...Array(6)].map((_, i) => (
                                    <SkeletonCard key={i} />
                                ))}
                            </div>
                        ) : items.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((asset) => (
                                        <AssetCard key={asset.id} asset={asset} />
                                    ))}
                                </div>
                                <Pagination data={assets} setIsLoading={setIsLoading} />
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center">
                                    <FileIcon className="w-8 h-8 text-gray-400 dark:text-white/40" />
                                </div>
                                <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-2">Belum ada produk digital</h3>
                                <p className="text-[14px] text-gray-500 dark:text-white/50">Produk digital akan segera tersedia. Stay tuned!</p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-gray-200 dark:border-white/[0.06] py-8">
                    <div className="max-w-[1200px] mx-auto px-6 text-center">
                        <p className="text-[13px] text-gray-400 dark:text-white/40">
                            © {new Date().getFullYear()} OtakAtikin. All rights reserved.
                        </p>
                    </div>
                </footer>
            </div>
        </>
    );
}
