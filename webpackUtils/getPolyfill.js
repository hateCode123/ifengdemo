
let env = process.env.NODE_ENV;

module.exports = (level, type) => {

    let str = `
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

    if (env == 'production') {
        str += `
        <!--[if lt IE 9]>
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
                    if (window && window.BJ_REPORT) {
                        window.BJ_REPORT.report(err, false, 'match');
                        window.BJ_REPORT.matchAutoRepair();
                    }
                } catch (error){
                    console && console.log(error);
                }
                
            }
        </script>`;
    }

    return str;
};
