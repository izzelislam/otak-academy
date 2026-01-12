import { useState } from 'react';

function XMarkIcon({ className }) {
    return (
        <svg className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
    );
}

export default function GenerateCodesModal({ show, asset, onClose, onSuccess }) {
    const [quantity, setQuantity] = useState(10);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    if (!show) return null;

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (quantity < 1 || quantity > 100) {
            setError('Quantity must be between 1 and 100');
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(route('admin.assets.generate-codes', asset.id), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.content,
                    'Accept': 'application/json',
                },
                body: JSON.stringify({ quantity }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to generate codes');
            }

            onSuccess(data.codes);
        } catch (err) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleClose = () => {
        setQuantity(10);
        setError(null);
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 transition-opacity"
                onClick={handleClose}
            />

            {/* Modal */}
            <div className="flex min-h-full items-center justify-center p-4">
                <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-gray-200 dark:border-slate-800">
                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-1 text-gray-400 hover:text-gray-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
                    >
                        <XMarkIcon className="w-5 h-5" />
                    </button>

                    <div className="p-6">
                        {/* Header */}
                        <div className="mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Generate Codes</h3>
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-1">
                                Generate redemption codes for "{asset.title}"
                            </p>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 dark:text-slate-300 mb-2">
                                    Number of Codes
                                </label>
                                <input
                                    id="quantity"
                                    type="number"
                                    min="1"
                                    max="100"
                                    value={quantity}
                                    onChange={(e) => {
                                        setQuantity(parseInt(e.target.value) || 1);
                                        setError(null);
                                    }}
                                    className="w-full px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-[#10a37f] focus:border-[#10a37f] transition-colors"
                                />
                                <p className="mt-1 text-xs text-gray-500 dark:text-slate-400">
                                    Maximum 100 codes per batch
                                </p>
                            </div>

                            {/* Warning */}
                            <div className="mb-4 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                                <p className="text-xs text-amber-800 dark:text-amber-200">
                                    <strong>Important:</strong> Generated codes will only be shown once. Make sure to copy them immediately after generation.
                                </p>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                                </div>
                            )}

                            {/* Actions */}
                            <div className="flex items-center justify-end gap-2">
                                <button
                                    type="button"
                                    onClick={handleClose}
                                    className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className="px-4 py-2 bg-[#10a37f] hover:bg-[#0e8c6b] disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-colors flex items-center gap-2"
                                >
                                    {isLoading ? (
                                        <>
                                            <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Generating...
                                        </>
                                    ) : (
                                        `Generate ${quantity} Code${quantity > 1 ? 's' : ''}`
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
