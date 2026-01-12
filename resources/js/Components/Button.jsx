import { Link } from '@inertiajs/react';

const variants = {
    primary: 'bg-[#10a37f] hover:bg-[#0e8c6b] text-white',
    secondary: 'bg-[#0a0a0a] hover:bg-[#1a1a1a] text-white dark:bg-white dark:hover:bg-gray-100 dark:text-[#0a0a0a]',
    outline: 'border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-800 hover:bg-gray-50 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200',
    ghost: 'hover:bg-gray-100 dark:hover:bg-slate-700 text-gray-700 dark:text-slate-200',
    danger: 'bg-red-600 hover:bg-red-700 text-white',
};

const sizes = {
    sm: 'px-2.5 py-1.5 text-xs',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2.5 text-sm',
};

export default function Button({
    children,
    variant = 'primary',
    size = 'md',
    href,
    className = '',
    disabled,
    processing,
    icon,
    ...props
}) {
    const baseClasses = 'inline-flex items-center justify-center gap-1.5 font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed';
    const classes = `${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`;

    const content = (
        <>
            {processing ? (
                <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
            ) : icon}
            {children}
        </>
    );

    if (href) {
        return <Link href={href} className={classes} {...props}>{content}</Link>;
    }

    return (
        <button className={classes} disabled={disabled || processing} {...props}>
            {content}
        </button>
    );
}

export function IconButton({ children, variant = 'ghost', className = '', as: Component = 'button', ...props }) {
    const baseClasses = 'p-1.5 rounded-lg transition-colors';
    const variantClasses = {
        ghost: 'text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:text-slate-200 dark:hover:bg-slate-700',
        danger: 'text-gray-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20',
    };
    return (
        <Component className={`${baseClasses} ${variantClasses[variant]} ${className}`} {...props}>
            {children}
        </Component>
    );
}
