import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import DataTable from '@/Components/Admin/DataTable';
import { useState } from 'react';

export default function Index({ members, filters }) {
    const [search, setSearch] = useState(filters.search || '');

    const handleSearch = (e) => {
        e.preventDefault();
        router.get(route('admin.members.index'), { search }, { preserveState: true });
    };

    const columns = [
        { label: 'Member' },
        { label: 'Courses' },
        { label: 'Redemptions' },
        { label: 'Joined' },
        { label: '', align: 'right' },
    ];

    const renderRow = (member) => (
        <tr key={member.id} className="hover:bg-gray-50 dark:hover:bg-slate-800/50">
            <td className="px-4 py-3">
                <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                        <span className="text-xs font-medium text-[#10a37f]">{member.name.charAt(0).toUpperCase()}</span>
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400">{member.email}</p>
                    </div>
                </div>
            </td>
            <td className="px-4 py-3 text-gray-900 dark:text-white">{member.courses_count}</td>
            <td className="px-4 py-3 text-gray-900 dark:text-white">{member.redemptions_count}</td>
            <td className="px-4 py-3 text-gray-500 dark:text-slate-400">{new Date(member.created_at).toLocaleDateString('id-ID')}</td>
            <td className="px-4 py-3 text-right">
                <Link href={route('admin.members.show', member.id)} className="text-xs font-medium text-[#10a37f] hover:text-[#0e8c6b]">View →</Link>
            </td>
        </tr>
    );

    const emptyState = (
        <div className="p-8 text-center">
            <p className="text-sm text-gray-500 dark:text-slate-400">Tidak ada member</p>
        </div>
    );

    return (
        <AdminLayout title="Members">
            <Head title="Members" />

            <div className="flex items-center gap-4 mb-4">
                <form onSubmit={handleSearch} className="flex-1 max-w-sm">
                    <div className="relative">
                        <svg className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Cari member..."
                            className="w-full pl-9 pr-3 py-2 text-sm bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f] text-gray-900 dark:text-white placeholder-gray-400"
                        />
                    </div>
                </form>
            </div>

            <DataTable
                columns={columns}
                data={members}
                renderRow={renderRow}
                emptyState={emptyState}
            />
        </AdminLayout>
    );
}
