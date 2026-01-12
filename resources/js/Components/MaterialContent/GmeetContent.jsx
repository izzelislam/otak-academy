export default function GmeetContent({ content, title }) {
    if (!content) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400">No meeting link available</p>
            </div>
        );
    }

    // Validate Google Meet URL
    const isValidMeetUrl = (url) => {
        try {
            const parsed = new URL(url);
            return parsed.hostname.includes('meet.google.com') || 
                   parsed.hostname.includes('google.com');
        } catch {
            return false;
        }
    };

    const isValid = isValidMeetUrl(content);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-8 text-center">
                {/* Google Meet Icon */}
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-400 via-blue-500 to-purple-500 rounded-full flex items-center justify-center mb-6 shadow-lg">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {title || 'Live Session'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Join the live session via Google Meet to interact with the instructor.
                </p>

                {/* Join Button */}
                {isValid ? (
                    <a
                        href={content}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-6 py-3 bg-green-600 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Join Meeting
                    </a>
                ) : (
                    <div className="text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4">
                        <svg className="mx-auto h-8 w-8 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                        <p className="text-sm">Invalid meeting link. Please contact support.</p>
                    </div>
                )}

                {/* Meeting Tips */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
                        Before Joining
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                            </svg>
                            <span>Check your microphone</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                            <span>Test your camera</span>
                        </div>
                        <div className="flex flex-col items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                            <svg className="w-6 h-6 text-gray-400 dark:text-gray-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0" />
                            </svg>
                            <span>Stable internet connection</span>
                        </div>
                    </div>
                </div>

                {/* Copy Link */}
                {isValid && (
                    <div className="mt-6">
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(content);
                                alert('Meeting link copied to clipboard!');
                            }}
                            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center justify-center mx-auto"
                        >
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                            </svg>
                            Copy meeting link
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
