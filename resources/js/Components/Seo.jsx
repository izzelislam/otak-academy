import { Head, usePage } from '@inertiajs/react';

function stripHtml(value = '') {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

function truncate(value = '', maxLength = 160) {
    if (!value || value.length <= maxLength) {
        return value;
    }

    return `${value.slice(0, maxLength - 1).trim()}…`;
}

function normalizeUrl(value, siteUrl) {
    if (!value) {
        return null;
    }

    if (value.startsWith('http://') || value.startsWith('https://')) {
        return value;
    }

    if (value.startsWith('//')) {
        return `https:${value}`;
    }

    if (!siteUrl) {
        return value;
    }

    return `${siteUrl.replace(/\/$/, '')}/${value.replace(/^\/+/, '')}`;
}

export default function Seo({
    title,
    description,
    image,
    canonical,
    keywords,
    type = 'website',
    robots = 'index,follow',
    publishedTime,
    modifiedTime,
    schema,
}) {
    const { props } = usePage();
    const defaults = props.seo ?? {};
    const siteName = defaults.site_name ?? 'OtakAtikin';
    const siteUrl = defaults.site_url?.replace(/\/$/, '') ?? '';
    const resolvedTitle = title || defaults.default_title || siteName;
    const resolvedDescription = truncate(stripHtml(description || defaults.default_description || ''));
    const resolvedCanonical = canonical
        ? normalizeUrl(canonical, siteUrl)
        : (typeof window !== 'undefined' ? window.location.href : siteUrl || null);
    const resolvedImage = normalizeUrl(image || defaults.default_image, siteUrl);
    const resolvedModifiedTime = modifiedTime || publishedTime || null;
    const jsonLd = schema ? JSON.stringify(schema) : null;
    const resolvedKeywords = Array.isArray(keywords) ? keywords.join(', ') : keywords;

    return (
        <Head title={resolvedTitle}>
            {resolvedDescription && <meta name="description" content={resolvedDescription} />}
            {resolvedKeywords && <meta name="keywords" content={resolvedKeywords} />}
            {robots && <meta name="robots" content={robots} />}
            {resolvedCanonical && <link rel="canonical" href={resolvedCanonical} />}

            <meta property="og:type" content={type} />
            <meta property="og:site_name" content={siteName} />
            <meta property="og:locale" content={defaults.default_locale ?? 'id-ID'} />
            <meta property="og:title" content={resolvedTitle} />
            {resolvedDescription && <meta property="og:description" content={resolvedDescription} />}
            {resolvedCanonical && <meta property="og:url" content={resolvedCanonical} />}
            {resolvedImage && <meta property="og:image" content={resolvedImage} />}

            <meta name="twitter:card" content={defaults.twitter_card ?? 'summary_large_image'} />
            <meta name="twitter:title" content={resolvedTitle} />
            {resolvedDescription && <meta name="twitter:description" content={resolvedDescription} />}
            {resolvedImage && <meta name="twitter:image" content={resolvedImage} />}

            {type === 'article' && publishedTime && (
                <meta property="article:published_time" content={publishedTime} />
            )}
            {type === 'article' && resolvedModifiedTime && (
                <meta property="article:modified_time" content={resolvedModifiedTime} />
            )}
            {jsonLd && (
                <script type="application/ld+json">
                    {jsonLd}
                </script>
            )}
        </Head>
    );
}
