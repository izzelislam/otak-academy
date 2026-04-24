<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="description" content="OtakAtikin adalah platform pembelajaran digital untuk kursus, blog, dan produk digital praktis bagi developer dan kreator di Indonesia.">
        <meta name="robots" content="index,follow">
        <meta property="og:type" content="website">
        <meta property="og:site_name" content="{{ config('app.name', 'OtakAtikin') }}">
        <meta property="og:title" content="{{ config('app.name', 'OtakAtikin') }}">
        <meta property="og:description" content="OtakAtikin adalah platform pembelajaran digital untuk kursus, blog, dan produk digital praktis bagi developer dan kreator di Indonesia.">
        <meta property="og:url" content="{{ url()->current() }}">
        <meta property="og:image" content="{{ url('/favicon/web-app-manifest-512x512.png') }}">
        <meta name="twitter:card" content="summary_large_image">
        <link rel="canonical" href="{{ url()->current() }}">
        <link rel="alternate" type="application/xml" title="Sitemap" href="{{ url('/sitemap.xml') }}">

        <title inertia>{{ config('app.name', 'OtakAtikin') }}</title>

        <!-- Fonts -->
        <link rel="preconnect" href="https://fonts.bunny.net">
        <link href="https://fonts.bunny.net/css?family=figtree:400,500,600&display=swap" rel="stylesheet" />

        <!-- Favicons -->
        <link rel="icon" type="image/png" href="/favicon/favicon-96x96.png" sizes="96x96" />
        <link rel="icon" type="image/svg+xml" href="/favicon/favicon.svg" />
        <link rel="shortcut icon" href="/favicon/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/favicon/apple-touch-icon.png" />
        <link rel="manifest" href="/favicon/site.webmanifest" />

        <!-- Scripts -->
        @routes
        @viteReactRefresh
        @vite(['resources/js/app.jsx', "resources/js/Pages/{$page['component']}.jsx"])
        @inertiaHead
    </head>
    <body class="font-sans antialiased">
        @inertia

        <!-- Midtrans Snap.js -->
        @if(config('midtrans.client_key'))
        <script>
            window.midtransClientKey = "{{ config('midtrans.client_key') }}";
        </script>
        <script type="text/javascript"
            src="{{ config('midtrans.is_production') ? 'https://app.midtrans.com/snap/snap.js' : 'https://app.sandbox.midtrans.com/snap/snap.js' }}"
            data-client-key="{{ config('midtrans.client_key') }}">
        </script>
        @endif
    </body>
</html>
