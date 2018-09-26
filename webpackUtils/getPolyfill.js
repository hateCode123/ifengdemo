module.exports = (level, type) => {
    if (level === 'low') {
        if (type === 'dev') {
            return `
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
            <!--[if lt IE 9]> 
                <!-- build:js es.polyfill.min.js crossorigin="anonymous" -->
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

    return `<!--[if lt IE 9]>
                <script>
                    var islow = true;
                </script>
            <![endif]-->
            <script>
                if(typeof islow !== 'undefined'){
                    try {
                        var errmsg = "Route matching error ";
                        if(navigator&&navigator.userAgent){
                            errmsg += ", UA: " + navigator.userAgent;
                        }
                        var err = new Error(errmsg);
                        if (window && window.BJ_REPORT) window.BJ_REPORT.report(err, false, 'match');
                    } catch (error){
                        console && console.log(error);
                    }
                    
                }
            </script>`;
};
