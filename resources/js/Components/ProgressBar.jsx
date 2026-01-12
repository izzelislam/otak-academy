export default function ProgressBar({ percentage = 0, showLabel = false, size = 'md', className = '' }) {
    // Ensure percentage is between 0 and 100
    const normalizedPercentage = Math.min(100, Math.max(0, percentage));
    
    // Size variants
    const sizeClasses = {
        sm: 'h-1',
        md: 'h-1.5',
        lg: 'h-2.5',
    };
    
    // Use consistent emerald/green color like admin
    const getProgressColor = () => {
        return 'bg-[#10a37f]';
    };

    return (
        <div className={`w-full ${className}`}>
            {showLabel && (
                <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700 dark:text-slate-300">Progress</span>
                    <span className="text-xs font-medium text-[#10a37f]">
                        {Math.round(normalizedPercentage)}%
                    </span>
                </div>
            )}
            <div className={`w-full bg-gray-200 dark:bg-slate-700 rounded-full ${sizeClasses[size] || sizeClasses.md}`}>
                <div
                    className={`${getProgressColor()} ${sizeClasses[size] || sizeClasses.md} rounded-full transition-all duration-300 ease-out`}
                    style={{ width: `${normalizedPercentage}%` }}
                />
            </div>
        </div>
    );
}
