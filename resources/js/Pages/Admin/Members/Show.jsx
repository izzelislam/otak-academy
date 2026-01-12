import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/Layouts/AdminLayout';
import { BackLink } from '@/Components/Admin/FormCard';

export default function Show({ member, redemptions }) {
    return (
        <AdminLayout title={member.name}>
            <Head title={`Member: ${member.name}`} />

            <BackLink href={route('admin.members.index')}>Kembali ke Members</BackLink>

            <div className="flex items-center gap-3 mb-4">
                <div className="h-12 w-12 rounded-full bg-[#10a37f]/10 dark:bg-[#10a37f]/20 flex items-center justify-center">
                    <span className="text-lg font-medium text-[#10a37f]">{member.name.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                    <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h1>
                    <p className="text-sm text-gray-500 dark:text-slate-400">{member.email}</p>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-3 max-w-xs mb-4">
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-3">
                    <p className="text-xs text-gray-500 dark:text-slate-400 uppercase">Courses</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{member.courses?.length || 0}</p>
                </div>
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-3">
                    <p className="text-xs text-gray-500 dark:text-slate-400 uppercase">Redemptions</p>
                    <p className="text-xl font-semibold text-gray-900 dark:text-white">{redemptions.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Enrolled Courses</h2>
                    </div>
                    {member.courses?.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-slate-800">
                            {member.courses.map((course) => (
                                <div key={course.id} className="px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900 dark:text-white">{course.title}</p>
                                        {course.description && <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5 line-clamp-1">{course.description}</p>}
                                    </div>
                                    <Link href={route('admin.courses.show', course.id)} className="text-xs text-[#10a37f] hover:text-[#0e8c6b]">View →</Link>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-slate-400">Belum ada course</div>
                    )}
                </div>

                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                        <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Redemption History</h2>
                    </div>
                    {redemptions.length > 0 ? (
                        <div className="divide-y divide-gray-100 dark:divide-slate-800">
                            {redemptions.map((r) => (
                                <div key={r.id} className="px-4 py-3">
                                    <div className="flex items-center justify-between">
                                        <code className="text-xs font-mono bg-gray-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-gray-700 dark:text-slate-300">{r.code}</code>
                                        <span className="text-xs text-gray-500 dark:text-slate-400">{r.used_at ? new Date(r.used_at).toLocaleDateString('id-ID') : '—'}</span>
                                    </div>
                                    <p className="text-sm text-gray-900 dark:text-white mt-1">{r.course?.title || '—'}</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="px-4 py-8 text-center text-sm text-gray-500 dark:text-slate-400">Belum ada redemption</div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
}
