import { Link } from '@inertiajs/react';
import Navbar from '@/Components/Navbar';
import Seo from '@/Components/Seo';

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

export default function BlogShow({ post, categories, auth }) {
    const formattedDate = post.published_at 
        ? new Date(post.published_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
        : null;
    const canonical = route('blog.show', post.slug);
    const description = post.meta_description || post.excerpt || post.content;

    return (
        <>
            <Seo
                title={post.meta_title || post.title}
                description={description}
                image={post.thumbnail}
                canonical={canonical}
                type="article"
                publishedTime={post.published_at || post.created_at}
                modifiedTime={post.updated_at}
                schema={{
                    '@context': 'https://schema.org',
                    '@type': 'Article',
                    headline: post.title,
                    description: post.meta_description || post.excerpt || undefined,
                    image: post.thumbnail ? [post.thumbnail] : undefined,
                    datePublished: post.published_at || post.created_at,
                    dateModified: post.updated_at,
                    author: post.author?.name
                        ? {
                            '@type': 'Person',
                            name: post.author.name,
                        }
                        : undefined,
                    articleSection: post.category?.name,
                    mainEntityOfPage: canonical,
                }}
            />
            <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-white antialiased transition-colors duration-300">
                <Navbar auth={auth} />

                {/* Article */}
                <article className="pt-24 pb-16">
                    <div className="max-w-[800px] mx-auto px-6">
                        {/* Back Link */}
                        <Link 
                            href={route('blog.index')}
                            className="inline-flex items-center gap-2 text-[14px] text-gray-500 hover:text-gray-900 dark:text-white/60 dark:hover:text-white transition-colors mb-8"
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
                            <h1 className="text-[32px] sm:text-[42px] font-semibold tracking-[-0.02em] leading-[1.2] text-gray-900 dark:text-white">
                                {post.title}
                            </h1>
                            <div className="flex items-center gap-4 mt-6 text-[14px] text-gray-500 dark:text-white/50">
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
                            className="prose dark:prose-invert prose-lg max-w-none
                                prose-headings:font-semibold prose-headings:tracking-tight
                                prose-h2:text-[24px] prose-h2:mt-10 prose-h2:mb-4
                                prose-h3:text-[20px] prose-h3:mt-8 prose-h3:mb-3
                                prose-p:text-gray-600 dark:prose-p:text-white/70 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-[#10a37f] prose-a:no-underline hover:prose-a:underline
                                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                                prose-code:text-[#10a37f] prose-code:bg-gray-100 dark:prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
                                prose-pre:bg-gray-50 dark:prose-pre:bg-white/5 prose-pre:border prose-pre:border-gray-200 dark:prose-pre:border-white/10 prose-pre:rounded-xl
                                prose-blockquote:border-l-[#10a37f] prose-blockquote:bg-gray-50 dark:prose-blockquote:bg-white/[0.02] prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:rounded-r-xl
                                prose-ul:text-gray-600 dark:prose-ul:text-white/70 prose-ol:text-gray-600 dark:prose-ol:text-white/70
                                prose-li:marker:text-[#10a37f]
                                prose-img:rounded-xl"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Tags / Categories */}
                        {categories && categories.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-white/[0.06]">
                                <h3 className="text-[14px] font-medium text-gray-500 dark:text-white/60 mb-4">Kategori Lainnya</h3>
                                <div className="flex flex-wrap gap-2">
                                    {categories.map((category) => (
                                        <Link
                                            key={category.id}
                                            href={route('blog.category', category.slug)}
                                            className="px-3 py-1.5 text-[13px] font-medium text-gray-600 bg-gray-100 dark:text-white/60 dark:bg-white/[0.05] rounded-full hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-white/10 dark:hover:text-white transition-colors"
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
