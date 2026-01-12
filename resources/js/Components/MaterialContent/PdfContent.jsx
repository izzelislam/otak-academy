export default function PdfContent({ content, title }) {
    if (!content) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400">No PDF available</p>
            </div>
        );
    }

    // Check if it's a valid URL
    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const pdfUrl = isValidUrl(content) ? content : null;

    if (!pdfUrl) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Invalid PDF URL</p>
            </div>
        );
    }

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-2xl">
            {/* PDF Viewer */}
            <div className="relative w-full" style={{ height: '80vh', minHeight: '500px' }}>
                <iframe
                    src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                    className="absolute top-0 left-0 w-full h-full border-0 rounded-t-lg"
                    title={title || 'PDF Document'}
                />
            </div>
        </div>
    );
}
