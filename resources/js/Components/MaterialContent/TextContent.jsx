export default function TextContent({ content }) {
    if (!content) {
        return (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400">No content available</p>
            </div>
        );
    }

    // Simple markdown-like rendering with dark mode support
    const renderContent = (text) => {
        // Convert markdown-style formatting to HTML
        let html = text
            // Escape HTML first
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            // Headers
            .replace(/^### (.+)$/gm, '<h3 class="text-lg font-semibold text-gray-900 dark:text-white mt-6 mb-3">$1</h3>')
            .replace(/^## (.+)$/gm, '<h2 class="text-xl font-semibold text-gray-900 dark:text-white mt-8 mb-4">$1</h2>')
            .replace(/^# (.+)$/gm, '<h1 class="text-2xl font-bold text-gray-900 dark:text-white mt-8 mb-4">$1</h1>')
            // Bold
            .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold text-gray-900 dark:text-white">$1</strong>')
            // Italic
            .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
            // Code blocks
            .replace(/```([\s\S]*?)```/g, '<pre class="bg-gray-800 dark:bg-gray-900 text-gray-100 dark:text-gray-200 p-4 rounded-lg overflow-x-auto my-4 border border-gray-200 dark:border-gray-700"><code>$1</code></pre>')
            // Inline code
            .replace(/`(.+?)`/g, '<code class="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 px-1.5 py-0.5 rounded text-sm">$1</code>')
            // Links
            .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline">$1</a>')
            // Unordered lists
            .replace(/^- (.+)$/gm, '<li class="ml-4">$1</li>')
            // Ordered lists
            .replace(/^\d+\. (.+)$/gm, '<li class="ml-4 list-decimal">$1</li>')
            // Blockquotes
            .replace(/^> (.+)$/gm, '<blockquote class="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic text-gray-600 dark:text-gray-400 my-4">$1</blockquote>')
            // Horizontal rules
            .replace(/^---$/gm, '<hr class="my-8 border-gray-200 dark:border-gray-700" />')
            // Paragraphs (double newlines)
            .replace(/\n\n/g, '</p><p class="mb-4">')
            // Single newlines to <br>
            .replace(/\n/g, '<br />');

        // Wrap in paragraph if not already wrapped
        if (!html.startsWith('<')) {
            html = `<p class="mb-4">${html}</p>`;
        }

        return html;
    };

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 sm:p-8">
            <div 
                className="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: renderContent(content) }}
            />
        </div>
    );
}
