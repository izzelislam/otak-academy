import { Head, Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';

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

function ArrowLeftIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
        </svg>
    );
}

export default function BlogShow({ post, categories }) {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        document.documentElement.classList.add('dark');
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formattedDate = post.published_at 
        ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;

    return (
        <>
            <Head title={post.meta_title || post.title} />
            {post.meta_description && (
                <Head>
                    <meta name="description" content={post.meta_description} />
                </Head>
            )}
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
                                <Link href={route('blog.index')} className="text-[14px] font-medium text-white">Blog</Link>
                                <Link href={route('login')} className="px-4 py-2 text-[14px] font-medium text-black bg-white hover:bg-white/90 rounded-lg transition-colors">
                                    Login
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Article */}
                <article className="pt-24 pb-16">
                    <div className="max-w-[800px] mx-auto px-6">
                        {/* Back Link */}
                        <Link 
                            href={route('blog.index')}
                            className="inline-flex items-center gap-2 text-[14px] text-white/60 hover:text-white transition-colors mb-8"
                        >
                            <ArrowLeftIcon className="w-4 h-4" />
                            Kembali ke Blog
                        </Link>

                        {/* Header */}
                        <header className="mb-8">
                            {post.category && (
                                <Link 
                                    href={route('blog.category', post.category.slug)}
                                    className="inline-block px-3 py-1 text-[12px] font-medium text-[#10a37f] bg-[#10a37f]/10 rounded-full mb-4 hover:bg-[#10a37f]/20 transition-colors"
                                >
                                    {post.category.name}
                                </Link>
                            )}
                            <h1 className="text-[32px] sm:text-[42px] font-semibold tracking-[-0.02em] leading-[1.2] text-white">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 mt-6 text-[14px] text-white/50">
                                {post.author && (
                                    <span className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-[#10a37f]/20 flex items-center justify-center">
                                            <span className="text-[12px] font-medium text-[#10a37f]">
                                                {post.author.name.charAt(0).toUpperCase()}
                                            </span>
                                        </div>
                                        {post.author.name}
                                    </span>
                                )}
                                {formattedDate && (
                                    <span className="flex items-center gap-1.5">
                                        <CalendarIcon className="w-4 h-4" />
                                        {formattedDate}
                                    </span>
                                )}
                            </div>
                        </header>

                        {/* Featured Image */}
                        {post.thumbnail && (
                            <div className="mb-10 rounded-2xl overflow-hidden">
                                <img 
                                    src={post.thumbnail} 
                                    alt={post.title}
                                    className="w-full h-auto"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div 
                            className="prose prose-invert prose-lg max-w-none
                                prose-headings:font-semibold prose-headings:tracking-tight
                                prose-h2:text-[24px] prose-h2:mt-10 prose-h2:mb-4
                                prose-h3:text-[20px] prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-[#10a37f] prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-white prose-strong:font-semibold
                                prose-code:text-[#10a37f] prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                prose-pre:bg-white/5 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl
                                prose-blockquote:border-l-[#10a37f] prose-blockquote:bg-white/[0.02] prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                                prose-ul:text-white/70 prose-ol:text-white/70
                                prose-li:marker:text-[#10a37f]
                                prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags / Categories */}
                        {categories && categories.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-white/[0.06]">
                                <h3 className="text-[14px] font-medium text-white/60 mb-4">Kategori Lainnya</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={route('blog.category', category.slug)}
                                            className="px-3 py-1.5 text-[13px] font-medium text-white/60 bg-white/[0.05] rounded-full hover:bg-white/10 hover:text-white transition-colors"
                                        >
                                            {category.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </article>

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
