import AdminLayout from '@/Layouts/AdminLayout';
import Button, { IconButton } from '@/Components/Button';
import DataTable from '@/Components/Admin/DataTable';
import { Head, Link, router } from '@inertiajs/react';

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

export default function AssetsIndex({ assets }) {
    const handleDelete = (assetId) => {
        if (confirm('Yakin ingin menghapus asset ini? File juga akan dihapus.')) {
            router.delete(route('admin.assets.destroy', assetId));
        }
    };

    const columns = [
        { label: 'Title' },
        { label: 'Type' },
        { label: 'File' },
        { label: 'Downloads' },
        { label: 'Status' },
        { label: 'Actions', align: 'right' },
    ];

    const renderRow = (asset) => (
        <tr key={asset.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                    {asset.thumbnail_url ? (
                        <img 
                            src={asset.thumbnail_url} 
                            alt={asset.title}
                            className="w-10 h-10 rounded-lg object-cover"
                        />
                    ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-400 dark:text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                            </svg>
                        </div>
                    )}
                    <div>
                        <Link href={route('admin.assets.show', asset.id)} className="font-medium text-gray-900 dark:text-white hover:text-[#10a37f]">
                            {asset.title}
                        </Link>
                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-0.5">/{asset.slug}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                    asset.type === 'free' 
                        ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                }`}>
                    {asset.type === 'free' ? 'Free' : 'Paid'}
                </span>
            </td>
            <td className="px-4 py-3">
                <div className="text-sm text-gray-500 dark:text-slate-400">
                    <p>{asset.file_name || '-'}</p>
                    <p className="text-xs text-gray-400 dark:text-slate-500">{formatFileSize(asset.file_size)}</p>
                </div>
            </td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400 text-sm">
                {asset.download_count || 0}
            </td>
            <td className="px-4 py-3">
                <span className={`inline-flex px-2 py-0.5 text-xs font-medium rounded ${
                    asset.is_published 
                        ? 'bg-[#10a37f]/10 text-[#10a37f] dark:bg-[#10a37f]/20' 
                        : 'bg-gray-100 text-gray-600 dark:bg-slate-800 dark:text-slate-400'
                }`}>
                    {asset.is_published ? 'Published' : 'Draft'}
                </span>
            </td>
            <td className="px-4 py-3">
                <div className="flex items-center justify-end gap-1">
                    <IconButton as="a" href={route('admin.assets.download', asset.id)} title="Download" className="text-gray-500 hover:text-[#10a37f] dark:text-slate-400 dark:hover:text-[#10a37f]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    </IconButton>
                    <IconButton as={Link} href={route('admin.assets.show', asset.id)} title="View">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                    </IconButton>
                    <IconButton as={Link} href={route('admin.assets.edit', asset.id)} title="Edit">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>
                    </IconButton>
                    <IconButton variant="danger" onClick={() => handleDelete(asset.id)} title="Delete">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                    </IconButton>
                </div>
            </td>
        </tr>
    );

    const emptyState = (
        <div className="p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                <svg className="w-6 h-6 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
            </div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">Belum ada asset</h3>
            <p className="text-xs text-gray-500 dark:text-slate-400 mb-3">Mulai dengan membuat asset pertama Anda.</p>
            <Button href={route('admin.assets.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                Create Asset
            </Button>
        </div>
    );

    return (
        <AdminLayout title="Downloadable Assets">
            <Head title="Downloadable Assets" />

            <div className="flex items-center justify-between gap-4 mb-4">
                <p className="text-sm text-gray-500 dark:text-slate-400">Kelola downloadable assets dan produk digital</p>
                <Button href={route('admin.assets.create')} size="sm" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" /></svg>}>
                    New Asset
                </Button>
            </div>

            <DataTable
                columns={columns}
                data={assets}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
