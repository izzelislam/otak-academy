import Pagination from './Pagination';

export default function DataTable({ 
    columns, 
    data, 
    renderRow, 
    emptyState,
    className = '' 
}) {
    // Handle both paginated and non-paginated data
    const items = data?.data || data || [];
    const isPaginated = data?.data !== undefined;

    if (items.length === 0) {
        return (
            <div className={`bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 ${className}`}>
                {emptyState || (
                    <div className="p-8 text-center">
                        <p className="text-sm text-gray-500 dark:text-slate-400">Tidak ada data</p>
                    </div>
                )}
            </div>
        );
    }

    return (
        <div className={`bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden ${className}`}>
            <table className="min-w-full text-sm">
                <thead>
                    <tr className="bg-gray-50 dark:bg-slate-800/50">
                        {columns.map((col, i) => (
                            <th
                                key={i}
                                className={`px-4 py-2.5 text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase ${
                                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                                } ${col.className || ''}`}
                            >
                                {col.label}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-slate-800">
                    {items.map((item, index) => renderRow(item, index))}
                </tbody>
            </table>
            
            {isPaginated && <Pagination data={data} />}
        </div>
    );
}
