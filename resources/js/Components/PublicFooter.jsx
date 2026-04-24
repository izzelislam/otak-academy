import { Link } from '@inertiajs/react';

export default function PublicFooter() {
    return (
        <footer className="border-t border-gray-200 dark:border-white/[0.06]">
            <div className="public-container py-8">
                <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
                    <div className="flex items-center gap-3">
                        <img src="/favicon/favicon-96x96.png" alt="OtakAtikin" className="h-6 w-6" />
                        <p className="text-[13px] text-gray-500 dark:text-white/40">
                            © {new Date().getFullYear()} OtakAtikin. All rights reserved.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px]">
                        <Link href="/" className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white">
                            Beranda
                        </Link>
                        <Link href={route('blog.index')} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white">
                            Blog
                        </Link>
                        <Link href={route('assets.index')} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white">
                            Produk Digital
                        </Link>
                        <Link href={route('ebook-generator')} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white">
                            Ebook Generator AI
                        </Link>
                        <Link href={route('terms-conditions')} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white">
                            Syarat & Ketentuan
                        </Link>
                        <Link href={route('contact')} className="text-gray-500 transition-colors hover:text-gray-900 dark:text-white/40 dark:hover:text-white">
                            Kontak
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
