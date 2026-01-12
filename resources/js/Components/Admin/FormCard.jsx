import { Link } from '@inertiajs/react';

export function FormCard({ children, title, description }) {
    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800">
            {(title || description) && (
                <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                    {title && <h3 className="text-sm font-semibold text-gray-900 dark:text-white">{title}</h3>}
                    {description && <p className="mt-0.5 text-xs text-gray-500 dark:text-slate-400">{description}</p>}
                </div>
            )}
            <div className="p-4">{children}</div>
        </div>
    );
}

export function FormInput({ label, id, error, hint, ...props }) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                className={`block w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f] transition-colors placeholder:text-gray-400 dark:placeholder:text-slate-500 ${error ? 'border-red-300 dark:border-red-500/50' : ''}`}
                {...props}
            />
            {hint && !error && <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{hint}</p>}
            {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}

export function FormTextarea({ label, id, error, hint, rows = 3, ...props }) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                rows={rows}
                className={`block w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f] transition-colors placeholder:text-gray-400 dark:placeholder:text-slate-500 ${error ? 'border-red-300 dark:border-red-500/50' : ''}`}
                {...props}
            />
            {hint && !error && <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{hint}</p>}
            {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}

export function FormSelect({ label, id, error, hint, children, ...props }) {
    return (
        <div>
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`block w-full px-3 py-2 text-sm rounded-lg border border-gray-300 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f] transition-colors ${error ? 'border-red-300 dark:border-red-500/50' : ''}`}
                {...props}
            >
                {children}
            </select>
            {hint && !error && <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">{hint}</p>}
            {error && <p className="mt-1 text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}

export function FormCheckbox({ label, id, error, ...props }) {
    return (
        <div className="flex items-center gap-2">
            <input
                id={id}
                type="checkbox"
                className="w-4 h-4 rounded border-gray-300 dark:border-slate-600 dark:bg-slate-800 text-[#10a37f] focus:ring-[#10a37f] cursor-pointer"
                {...props}
            />
            {label && (
                <label htmlFor={id} className="text-sm text-gray-700 dark:text-slate-300 cursor-pointer">
                    {label}
                </label>
            )}
            {error && <p className="text-xs text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
}

export function FormActions({ cancelHref, submitLabel, processing }) {
    return (
        <div className="flex items-center justify-end gap-2 pt-4 mt-4 border-t border-gray-200 dark:border-slate-800">
            <Link
                href={cancelHref}
                className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors"
            >
                Batal
            </Link>
            <button
                type="submit"
                disabled={processing}
                className="px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors"
            >
                {processing ? (
                    <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Memproses...
                    </span>
                ) : submitLabel}
            </button>
        </div>
    );
}

export function BackLink({ href, children }) {
    return (
        <Link
            href={href}
            className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors mb-4"
        >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {children}
        </Link>
    );
}
