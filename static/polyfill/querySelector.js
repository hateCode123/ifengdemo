if (typeof document.querySelector === 'undefined') {
    document.querySelector = function(target) {
        return document.getElementsByTagName(target)[0] || null;
    };
}
