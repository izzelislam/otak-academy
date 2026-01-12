import { Link } from '@inertiajs/react';

export default function Pagination({ data, className = '' }) {
    if (!data || !data.links || data.last_page <= 1) {
        return null;
    }

    return (
        <div className={`px-4 py-3 border-t border-gray-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs ${className}`}>
            <span className="text-gray-500 dark:text-slate-400">
                {data.from}–{data.to} dari {data.total}
            </span>
            <div className="flex gap-1">
                {data.links.map((link, i) => (
                    <Link
                        key={i}
                        href={link.url || '#'}
                        preserveScroll
                        preserveState
                        className={`px-2.5 py-1 rounded transition-colors ${
                            link.active
                                ? 'bg-[#10a37f] text-white'
                                : link.url
                                ? 'text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                : 'text-gray-300 dark:text-slate-600 cursor-not-allowed'
                        }`}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ))}
            </div>
        </div>
    );
}
