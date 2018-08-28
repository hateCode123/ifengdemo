module.exports = (level, type) => {
    if (level === 'low') {
        if (type === 'dev') {
            return `
            <!--[if lt IE 8]>
                <script src="/polyfill/querySelector.js"></script>
                <script src="/polyfill/lib/json3.min.js"></script>
            <![endif]-->
            <!--[if lt IE 9]>
                <script src="/polyfill/textContent.js"></script>
                <script src="/polyfill/now.js"></script>
                <script src="/polyfill/getComputedStyle.js"></script>
                <script src="/polyfill/lib/es5-shim.min.js"></script>
                <script src="/polyfill/lib/es5-sham.min.js"></script>
                <script src="/polyfill/lib/console-polyfill.min.js"></script>
            <![endif]-->`;
        } else {
            return `
            <!--[if lt IE 8]>
            <!-- build:js ie8.polyfill.min.js -->
                <script src="/polyfill/querySelector.js"></script>
                <script src="/polyfill/lib/json3.min.js"></script>
            <!-- endbuild -->
            <![endif]-->
            <!--[if lt IE 9]>
                <!-- build:js es.polyfill.min.js -->
                    <script src="/polyfill/textContent.js"></script>
                    <script src="/polyfill/now.js"></script>
                    <script src="/polyfill/getComputedStyle.js"></script>
                    <script src="/polyfill/lib/es5-shim.min.js"></script>
                    <script src="/polyfill/lib/es5-sham.min.js"></script>
                    <script src="/polyfill/lib/console-polyfill.min.js"></script>
                <!-- endbuild -->
            <![endif]-->`;
        }
    }

    return '';
};
