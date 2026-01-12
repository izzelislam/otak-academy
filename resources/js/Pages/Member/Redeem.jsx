import MemberLayout from '@/Layouts/MemberLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';
import { Head, useForm } from '@inertiajs/react';

export default function Redeem({ success, error }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        code: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('member.redeem.store'), {
            onSuccess: () => reset('code'),
        });
    };

    return (
        <MemberLayout title="Redeem Code">
            <Head title="Redeem Code" />

            <div className="max-w-md mx-auto">
                <div className="bg-white dark:bg-slate-900 border border-gray-200 dark:border-slate-800 rounded-lg p-6">
                    {/* Success Message */}
                    {success && (
                        <div className="mb-6 p-4 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 border border-[#10a37f]/20 dark:border-[#10a37f]/30 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-[#10a37f] mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-[#10a37f]">{success}</p>
                            </div>
                        </div>
                    )}

                    {/* Error Message */}
                    {error && (
                        <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <div className="flex items-center">
                                <svg className="w-5 h-5 text-red-500 dark:text-red-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                            </div>
                        </div>
                    )}

                    <div className="text-center mb-6">
                        <div className="w-14 h-14 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <svg className="w-7 h-7 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                            </svg>
                        </div>
                        <h1 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                            Redeem Course Code
                        </h1>
                        <p className="text-sm text-gray-500 dark:text-slate-400">
                            Enter your course code to unlock premium content
                        </p>
                    </div>

                    <form onSubmit={submit} className="space-y-4">
                        <div>
                            <InputLabel htmlFor="code" value="Course Code" className="text-gray-900 dark:text-white text-sm" />
                            <TextInput
                                id="code"
                                type="text"
                                name="code"
                                value={data.code}
                                className="mt-2 block w-full text-center uppercase tracking-widest text-lg py-3 bg-gray-50 dark:bg-slate-800 border-gray-200 dark:border-slate-700 focus:border-[#10a37f] dark:focus:border-[#10a37f] focus:ring-[#10a37f] dark:focus:ring-[#10a37f] rounded-lg"
                                placeholder="COURSE-CODE-2024"
                                autoComplete="off"
                                isFocused={true}
                                onChange={(e) => setData('code', e.target.value.toUpperCase())}
                            />
                            <InputError message={errors.code} className="mt-2" />
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center px-4 py-3 bg-[#10a37f] hover:bg-[#0e8c6b] text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {processing ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z" />
                                    </svg>
                                    Redeem Code
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-6 border-t border-gray-200 dark:border-slate-800">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                            How to get a code?
                        </h4>
                        <ul className="text-sm text-gray-500 dark:text-slate-400 space-y-2">
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                    <svg className="w-3 h-3 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Purchase a course from our official store
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                    <svg className="w-3 h-3 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Receive a promotional code from events
                            </li>
                            <li className="flex items-start">
                                <div className="flex-shrink-0 w-5 h-5 bg-[#10a37f]/10 dark:bg-[#10a37f]/20 rounded-full flex items-center justify-center mr-2 mt-0.5">
                                    <svg className="w-3 h-3 text-[#10a37f]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                Get a code from your organization
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </MemberLayout>
    );
}
