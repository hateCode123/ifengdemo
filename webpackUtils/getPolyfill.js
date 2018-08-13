module.exports = level => {
    if (level === 'low') {
        return `
<!--[if lt IE 8]>
<!-- build:js ie8.polyfill.min.js -->
    <script src="/polyfill/querySelector.js"></script>
    <script src="/polyfill/lib/json3.min.js"></script>
<!-- endbuild -->
<![endif]-->
<!--[if lt IE 9]>
    <!-- build:js ie9.polyfill.min.js -->
        <script src="/polyfill/textContent.js"></script>
        <script src="/polyfill/now.js"></script>
        <script src="/polyfill/getComputedStyle.js"></script>
    <!-- endbuild -->
<![endif]-->
<!--[if lt IE 9]>
    <!-- build:js es.polyfill.min.js -->
        <script src="/polyfill/lib/es5-shim.min.js"></script>
        <script src="/polyfill/lib/es5-sham.min.js"></script>
        <script src="/polyfill/lib/console-polyfill.min.js"></script>
    <!-- endbuild -->
<![endif]-->`;
    }

    return `
<!--[if lt IE 9]>
<!-- build:js ie9.polyfill.min.js -->
        <script src="/polyfill/textContent.js"></script>
        <script src="/polyfill/now.js"></script>
        <script src="/polyfill/getComputedStyle.js"></script>
    <!-- endbuild -->
<![endif]-->
<!--[if lt IE 9]>
    <!-- build:js es.polyfill.min.js -->
        <script src="/polyfill/lib/es5-shim.min.js"></script>
        <script src="/polyfill/lib/es5-sham.min.js"></script>
        <script src="/polyfill/lib/console-polyfill.min.js"></script>
    <!-- endbuild -->
<![endif]-->`;
};
