export default function VideoContent({ content, title }) {
    // Extract video ID and determine platform
    const getEmbedUrl = (url) => {
        if (!url) return null;

        // YouTube patterns
        const youtubePatterns = [
            /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/v\/([a-zA-Z0-9_-]{11})/,
        ];

        for (const pattern of youtubePatterns) {
            const match = url.match(pattern);
            if (match) {
                // Parameters to hide YouTube branding and controls styling
                // modestbranding=1 - hide YouTube logo
                // rel=0 - don't show related videos
                // showinfo=0 - hide video title/uploader (deprecated but still works sometimes)
                // controls=1 - show controls but minimal
                // color=white - use white progress bar instead of red
                // iv_load_policy=3 - hide annotations
                // disablekb=0 - allow keyboard controls
                return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1&showinfo=0&color=white&iv_load_policy=3`;
            }
        }

        // Vimeo patterns
        const vimeoPatterns = [
            /vimeo\.com\/(\d+)/,
            /player\.vimeo\.com\/video\/(\d+)/,
        ];

        for (const pattern of vimeoPatterns) {
            const match = url.match(pattern);
            if (match) {
                return `https://player.vimeo.com/video/${match[1]}`;
            }
        }

        // If already an embed URL, return as is
        if (url.includes('embed') || url.includes('player')) {
            return url;
        }

        return null;
    };

    const embedUrl = getEmbedUrl(content);

    if (!embedUrl) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-8 text-center">
                <svg className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400">Invalid video URL</p>
                <p className="mt-2 text-sm text-gray-400 dark:text-gray-500">Please contact support if this issue persists.</p>
            </div>
        );
    }

    return (
        <div className="video-player-wrapper">
            {/* Video Container with custom styling */}
            <div className="relative bg-black rounded-2xl overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.8)]">
                
                {/* Video aspect ratio container */}
                <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={embedUrl}
                        title={title || 'Video'}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    />
                </div>
                
                {/* Bottom gradient overlay for depth */}
                <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
            </div>
            
            {/* Video title below player */}
            {title && (
                <div className="mt-4 px-2">
                    <h2 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white flex items-center">
                        <svg className="w-5 h-5 mr-2 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                        {title}
                    </h2>
                </div>
            )}
        </div>
    );
}
