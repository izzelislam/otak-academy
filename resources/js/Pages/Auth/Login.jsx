import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <>
            <Head title="Masuk" />
            <div className="min-h-screen flex bg-white">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex lg:w-1/2 bg-[#0a0a0a] relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#10a37f]/10 rounded-full blur-3xl"></div>
                        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#10a37f]/5 rounded-full blur-3xl"></div>
                    </div>
                    
                    <div className="relative z-10 flex flex-col justify-center px-16 text-white">
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-10">
                                <div className="w-10 h-10 bg-[#10a37f] rounded-lg flex items-center justify-center">
                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <span className="text-xl font-semibold tracking-tight">OtakAtikin</span>
                            </div>
                            <h1 className="text-4xl font-semibold mb-4 leading-tight tracking-tight">
                                Akses semua konten<br />dalam satu platform
                            </h1>
                            <p className="text-base text-gray-400 leading-relaxed max-w-md">
                                Kursus, blog, produk digital, dan resources berkualitas untuk mengembangkan skill dan karir Anda.
                            </p>
                        </div>

                        <div className="space-y-5">
                            {[
                                { text: "Kursus, blog, dan produk digital premium" },
                                { text: "Akses konten tanpa batas waktu" },
                                { text: "Sertifikat & resources eksklusif" }
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-[#10a37f] flex items-center justify-center">
                                        <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <span className="text-gray-300 text-sm">{item.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Side - Login Form */}
                <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
                    <div className="w-full max-w-sm">
                        <div className="lg:hidden flex items-center justify-center gap-2 mb-10">
                            <div className="w-8 h-8 bg-[#10a37f] rounded-lg flex items-center justify-center">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <span className="text-lg font-semibold text-[#0a0a0a]">OtakAtikin</span>
                        </div>

                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-semibold text-[#0a0a0a] mb-2 tracking-tight">Selamat datang kembali</h2>
                            <p className="text-gray-500 text-sm">Masuk untuk mengakses semua konten</p>
                        </div>

                        {status && (
                            <div className="mb-6 p-3 bg-[#10a37f]/10 border border-[#10a37f]/20 rounded-lg">
                                <p className="text-sm text-[#10a37f]">{status}</p>
                            </div>
                        )}

                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                                    Email
                                </label>
                                <input id="email" type="email" name="email" value={data.email}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f] transition-colors text-[#0a0a0a] text-sm placeholder-gray-400"
                                    placeholder="nama@email.com" autoComplete="username" autoFocus
                                    onChange={(e) => setData('email', e.target.value)} />
                                <InputError message={errors.email} className="mt-1.5" />
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm font-medium text-[#0a0a0a] mb-1.5">
                                    Password
                                </label>
                                <input id="password" type="password" name="password" value={data.password}
                                    className="w-full px-3 py-2.5 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f] transition-colors text-[#0a0a0a] text-sm placeholder-gray-400"
                                    placeholder="••••••••" autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)} />
                                <InputError message={errors.password} className="mt-1.5" />
                            </div>

                            <div className="flex items-center justify-between pt-1">
                                <label className="flex items-center cursor-pointer">
                                    <Checkbox name="remember" checked={data.remember}
                                        onChange={(e) => setData('remember', e.target.checked)}
                                        className="rounded border-gray-300 text-[#10a37f] focus:ring-[#10a37f]" />
                                    <span className="ml-2 text-sm text-gray-600">Ingat saya</span>
                                </label>
                                {canResetPassword && (
                                    <Link href={route('password.request')} className="text-sm text-[#10a37f] hover:text-[#0e8c6b] transition-colors">
                                        Lupa password?
                                    </Link>
                                )}
                            </div>

                            <button type="submit" disabled={processing}
                                className="w-full py-2.5 px-4 bg-[#10a37f] hover:bg-[#0e8c6b] text-white text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-2">
                                {processing ? (
                                    <span className="flex items-center justify-center gap-2">
                                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Memproses...
                                    </span>
                                ) : 'Masuk'}
                            </button>
                            <div className="relative my-6">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-200"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Atau masuk dengan</span>
                                </div>
                            </div>

                            <a href={route('auth.google')} 
                               className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 text-sm font-medium rounded-lg transition-colors">
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                </svg>
                                Google
                            </a>
                        </form>

                        <p className="mt-8 text-center text-sm text-gray-500">
                            Belum punya akun?{' '}
                            <Link href={route('register')} className="text-[#10a37f] hover:text-[#0e8c6b] font-medium transition-colors">
                                Daftar
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
