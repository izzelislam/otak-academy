import { useState } from 'react';
import axios from 'axios';

function XMarkIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

function LockIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
        </svg>
    );
}

function CheckCircleIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
    );
}

function DownloadIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
        </svg>
    );
}

export default function RedeemCodeModal({ show, asset, onClose, onSuccess }) {
    const [code, setCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [downloadData, setDownloadData] = useState(null);

    if (!show) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!code.trim()) {
            setError('Please enter a code');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await axios.post(route('assets.redeem', asset.id), {
                code: code.trim()
            });

            setSuccess(true);
            setDownloadData(response.data);
        } catch (err) {
            // Always show generic error message for security unless specifics are safe
            setError(err.response?.data?.message || 'Invalid or expired code.');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDownload = () => {
        if (downloadData?.download_url) {
            onSuccess(downloadData);
        }
    };

    const handleClose = () => {
        setCode('');
        setError(null);
        setSuccess(false);
        setDownloadData(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md bg-[#0a0a0a] border border-white/[0.1] rounded-2xl shadow-2xl">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-1 text-white/40 hover:text-white transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>

                    <div className="p-6">
                        {!success ? (
                            <>
                                {/* Header */}
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center">
                                        <LockIcon className="w-5 h-5 text-amber-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-[18px] font-semibold text-white">Redeem Code</h3>
                                        <p className="text-[13px] text-white/50">Enter your code to download</p>
                                    </div>
                                </div>

                                {/* Asset Info */}
                                <div className="mb-6 p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg">
                                    <p className="text-[13px] text-white/50 mb-1">Asset</p>
                                    <p className="text-[14px] text-white font-medium">{asset.title}</p>
                                </div>

                                {/* Form */}
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-4">
                                        <label htmlFor="code" className="block text-[13px] font-medium text-white/70 mb-2">
                                            Redemption Code
                                        </label>
                                        <input
                                            id="code"
                                            type="text"
                                            value={code}
                                            onChange={(e) => {
                                                setCode(e.target.value.toUpperCase());
                                                setError(null);
                                            }}
                                            placeholder="Enter your code (e.g., DL001-XXXX-XX)"
                                            className="w-full px-4 py-3 bg-white/[0.05] border border-white/[0.1] rounded-xl text-[14px] text-white placeholder:text-white/30 focus:outline-none focus:border-amber-500/50 focus:ring-1 focus:ring-amber-500/50 transition-colors font-mono tracking-wider"
                                            autoFocus
                                            autoComplete="off"
                                            spellCheck="false"
                                        />
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                                            <p className="text-[13px] text-red-400">{error}</p>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isLoading || !code.trim()}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-amber-500 hover:bg-amber-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors"
                                    >
                                        {isLoading ? (
                                            <>
                                                <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Validating...
                                            </>
                                        ) : (
                                            'Redeem Code'
                                        )}
                                    </button>
                                </form>

                                {/* Help Text */}
                                <p className="mt-4 text-[12px] text-white/40 text-center">
                                    Codes are case-insensitive and can only be used once.
                                </p>
                            </>
                        ) : (
                            <>
                                {/* Success State */}
                                <div className="text-center py-4">
                                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[#10a37f]/10 flex items-center justify-center">
                                        <CheckCircleIcon className="w-8 h-8 text-[#10a37f]" />
                                    </div>
                                    <h3 className="text-[20px] font-semibold text-white mb-2">Code Redeemed!</h3>
                                    <p className="text-[14px] text-white/50 mb-6">
                                        Your code has been successfully redeemed. Click below to download.
                                    </p>

                                    {downloadData?.downloads_remaining !== undefined && (
                                        <p className="text-[13px] text-white/40 mb-4">
                                            Downloads remaining: {downloadData.downloads_remaining}
                                        </p>
                                    )}

                                    <button
                                        onClick={handleDownload}
                                        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] text-white font-medium rounded-xl transition-colors"
                                    >
                                        <DownloadIcon className="w-5 h-5" />
                                        Download Now
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
