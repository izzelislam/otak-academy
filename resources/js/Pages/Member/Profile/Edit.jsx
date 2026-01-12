import MemberLayout from '@/Layouts/MemberLayout';
import { Head, useForm } from '@inertiajs/react';

function UpdateProfileForm({ user, status }) {
    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('member.profile.update'));
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden h-full">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Informasi Profil</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Update nama dan email akun Anda</p>
            </div>
            <form onSubmit={submit} className="p-4 space-y-4">
                {status === 'profile-updated' && (
                    <div className="p-3 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 border border-[#10a37f]/20 dark:border-[#10a37f]/30 rounded-lg">
                        <p className="text-sm text-[#10a37f]">Profil berhasil diperbarui.</p>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Nama</label>
                    <input
                        type="text"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f]"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f]"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Simpan'}
                </button>
            </form>
        </div>
    );
}

function UpdatePasswordForm({ status }) {
    const { data, setData, put, errors, processing, reset } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const submit = (e) => {
        e.preventDefault();
        put(route('member.profile.password'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 overflow-hidden h-full">
            <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-800">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Ubah Password</h2>
                <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">Pastikan menggunakan password yang kuat</p>
            </div>
            <form onSubmit={submit} className="p-4 space-y-4">
                {status === 'password-updated' && (
                    <div className="p-3 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 border border-[#10a37f]/20 dark:border-[#10a37f]/30 rounded-lg">
                        <p className="text-sm text-[#10a37f]">Password berhasil diperbarui.</p>
                    </div>
                )}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Password Saat Ini</label>
                    <input
                        type="password"
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f]"
                    />
                    {errors.current_password && <p className="mt-1 text-xs text-red-500">{errors.current_password}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Password Baru</label>
                    <input
                        type="password"
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f]"
                    />
                    {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-1">Konfirmasi Password</label>
                    <input
                        type="password"
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f]"
                    />
                    {errors.password_confirmation && <p className="mt-1 text-xs text-red-500">{errors.password_confirmation}</p>}
                </div>
                <button
                    type="submit"
                    disabled={processing}
                    className="px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50"
                >
                    {processing ? 'Menyimpan...' : 'Ubah Password'}
                </button>
            </form>
        </div>
    );
}

export default function ProfileEdit({ user, status }) {
    return (
        <MemberLayout title="Profile">
            <Head title="Profile" />

            <div className="space-y-6">
                {/* Header */}
                <div className="bg-white dark:bg-slate-900 rounded-lg border border-gray-200 dark:border-slate-800 p-4">
                    <div className="flex items-center gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-[#10a37f] to-emerald-600 rounded-full flex items-center justify-center">
                            <span className="text-xl font-semibold text-white">
                                {user.name.charAt(0).toUpperCase()}
                            </span>
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-gray-900 dark:text-white">{user.name}</h1>
                            <p className="text-sm text-gray-500 dark:text-slate-400">{user.email}</p>
                        </div>
                    </div>
                </div>

                {/* Two Column Layout */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    <UpdateProfileForm user={user} status={status} />
                    <UpdatePasswordForm status={status} />
                </div>
            </div>
        </MemberLayout>
    );
}
