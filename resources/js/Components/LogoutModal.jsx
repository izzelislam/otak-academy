import { useForm } from '@inertiajs/react';

export default function LogoutModal({ isOpen, onClose }) {
    const { post, processing } = useForm();

    const handleLogout = () => {
        post(route('logout'));
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
                {/* Backdrop */}
                <div 
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity" 
                    onClick={onClose}
                />
                
                {/* Modal */}
                <div className="relative bg-white dark:bg-[#1e1e1e] rounded-xl shadow-xl max-w-sm w-full p-6 transform transition-all">
                    <div className="text-center">
                        {/* Icon */}
                        <div className="mx-auto w-12 h-12 bg-red-100 dark:bg-red-500/10 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-6 h-6 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                        </div>
                        
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            Konfirmasi Logout
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                            Apakah Anda yakin ingin keluar dari akun?
                        </p>
                        
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-white/10 rounded-lg hover:bg-gray-200 dark:hover:bg-white/20 transition-colors"
                            >
                                Batal
                            </button>
                            <button
                                type="button"
                                onClick={handleLogout}
                                disabled={processing}
                                className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50"
                            >
                                {processing ? 'Logging out...' : 'Ya, Logout'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
