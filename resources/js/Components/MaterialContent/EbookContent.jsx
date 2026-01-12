export default function EbookContent({ content, title }) {
    if (!content) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400">No ebook available</p>
            </div>
        );
    }

    // Get file extension from URL
    const getFileExtension = (url) => {
        try {
            const pathname = new URL(url).pathname;
            const ext = pathname.split('.').pop()?.toLowerCase();
            return ext || 'file';
        } catch {
            return 'file';
        }
    };

    // Get file size display (placeholder - actual size would come from backend)
    const getFileInfo = (url) => {
        const ext = getFileExtension(url);
        const formats = {
            pdf: { icon: 'PDF', color: 'text-red-400' },
            epub: { icon: 'EPUB', color: 'text-green-400' },
            mobi: { icon: 'MOBI', color: 'text-blue-400' },
            azw: { icon: 'AZW', color: 'text-orange-400' },
            azw3: { icon: 'AZW3', color: 'text-orange-400' },
        };
        return formats[ext] || { icon: ext.toUpperCase(), color: 'text-gray-400' };
    };

    const fileInfo = getFileInfo(content);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden">
            <div className="p-8 text-center">
                {/* Ebook Icon */}
                <div className="mx-auto w-24 h-32 bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg shadow-lg flex items-center justify-center mb-6 relative">
                    <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    <span className={`absolute -bottom-2 -right-2 px-2 py-1 bg-white dark:bg-gray-800 rounded shadow text-xs font-bold ${fileInfo.color}`}>
                        {fileInfo.icon}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {title || 'Ebook'}
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                    Download this ebook to read on your preferred device or reader app.
                </p>

                {/* Download Button */}
                <a
                    href={content}
                    download
                    className="inline-flex items-center px-6 py-3 bg-teal-600 border border-transparent rounded-lg font-semibold text-sm text-white uppercase tracking-widest hover:bg-teal-700 focus:bg-teal-700 active:bg-teal-900 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition ease-in-out duration-150"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download Ebook
                </a>

                {/* Reading Tips */}
                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                        Recommended Reading Apps
                    </h4>
                    <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-500 dark:text-gray-400">
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
                            </svg>
                            Kindle
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                            </svg>
                            Apple Books
                        </span>
                        <span className="flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                            Google Play Books
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
