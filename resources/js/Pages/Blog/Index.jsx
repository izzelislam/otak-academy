import { Head, Link, router } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import { useState } from 'react';

function CalendarIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
        </svg>
    );
}

function UserIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
        </svg>
    );
}

function SearchIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
        </svg>
    );
}

function BlogCard({ post }) {
    const formattedDate = post.published_at 
        ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    return (
        <article className="group bg-white dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-2xl overflow-hidden hover:border-gray-300 dark:hover:bg-white/[0.04] dark:hover:border-white/[0.1] transition-all duration-300">
            {post.thumbnail && (
                <Link href={route('blog.show', post.slug)} className="block aspect-video overflow-hidden">
                    <img 
                        src={post.thumbnail} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </Link>
            )}
            <div className="p-6">
                {post.category && (
                    <Link 
                        href={route('blog.category', post.category.slug)}
                        className="inline-block px-2.5 py-1 text-[11px] font-medium text-[#10a37f] bg-[#10a37f]/10 rounded-full mb-3 hover:bg-[#10a37f]/20 transition-colors"
                    >
                        {post.category.name}
                    </Link>
                )}
                <Link href={route('blog.show', post.slug)}>
                    <h2 className="text-[18px] font-semibold text-gray-900 dark:text-white leading-tight mb-2 group-hover:text-[#10a37f] transition-colors line-clamp-2">
                        {post.title}
                    </h2>
                </Link>
                {post.excerpt && (
                    <p className="text-[14px] text-gray-500 dark:text-white/50 leading-relaxed mb-4 line-clamp-2">
                        {post.excerpt}
                    </p>
                )}
                <div className="flex items-center gap-4 text-[12px] text-gray-400 dark:text-white/40">
                    {post.author && (
                        <span className="flex items-center gap-1.5">
                            <UserIcon className="w-3.5 h-3.5" />
                            {post.author.name}
                        </span>
                    )}
                    {formattedDate && (
                        <span className="flex items-center gap-1.5">
                            <CalendarIcon className="w-3.5 h-3.5" />
                            {formattedDate}
                        </span>
                    )}
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
                            ? 'text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10'
                            : 'text-gray-300 dark:text-white/20 cursor-not-allowed'
                    }`}
                    dangerouslySetInnerHTML={{ __html: link.label }}
                />
            ))}
        </div>
    );
}

export default function BlogIndex({ posts, categories, auth }) {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.get(route('blog.search'), { q: searchQuery });
        }
    };

    const items = posts?.data || posts || [];

    return (
        <>
            <Head title="Blog" />
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
                <Navbar auth={auth} />

                {/* Hero Section */}
                <section className="pt-32 pb-16 border-b border-gray-200 dark:border-white/[0.06]">
                    <div className="max-w-[1200px] mx-auto px-6">
                        <div className="text-center max-w-2xl mx-auto">
                            <h1 className="text-[40px] sm:text-[56px] font-semibold tracking-[-0.02em] leading-[1.1]">
                                Blog
                            </h1>
                            <p className="mt-4 text-[16px] sm:text-[18px] text-gray-600 dark:text-white/50">
                                Artikel, tips, dan insight seputar teknologi dan pengembangan skill
                            </p>
                            
                            {/* Search */}
                            <form onSubmit={handleSearch} className="mt-8 max-w-md mx-auto">
                                <div className="relative">
                                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-white/40" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Cari artikel..."
                                        className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-white/[0.05] border border-transparent dark:border-white/[0.1] rounded-xl text-[14px] text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/40 focus:outline-none focus:border-[#10a37f]/50 focus:ring-1 focus:ring-[#10a37f]/50 transition-colors"
                                    />
                                </div>
                            </form>
                        </div>

                        {/* Categories */}
                        {categories && categories.length > 0 && (
                            <div className="mt-10 flex flex-wrap justify-center gap-2">
                                <Link
                                    href={route('blog.index')}
                                    className="px-4 py-2 text-[13px] font-medium text-gray-900 bg-gray-100/80 dark:text-white dark:bg-white/10 rounded-full hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                                >
                                    Semua
                                </Link>
                                {categories.map((category) => (
                                    <Link
                                        key={category.id}
                                        href={route('blog.category', category.slug)}
                                        className="px-4 py-2 text-[13px] font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-100 dark:text-white/60 dark:hover:text-white dark:hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        {category.name}
                                    </Link>
                                ))}
                            </div>
                        )}
                    </div>
                </section>

                {/* Blog Posts */}
                <section className="py-16">
                    <div className="max-w-[1200px] mx-auto px-6">
                        {items.length > 0 ? (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {items.map((post) => (
                                        <BlogCard key={post.id} post={post} />
                                    ))}
                                </div>
                                <Pagination data={posts} />
                            </>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 dark:bg-white/[0.05] flex items-center justify-center">
                                    <svg className="w-8 h-8 text-gray-400 dark:text-white/40" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                                    </svg>
                                </div>
                                <h3 className="text-[18px] font-semibold text-gray-900 dark:text-white mb-2">Belum ada artikel</h3>
                                <p className="text-[14px] text-gray-500 dark:text-white/50">Artikel akan segera hadir. Stay tuned!</p>
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
