const handleUrl = url => {
    if (!url) return;

    if (url.indexOf('http:') === 0) {
        return url.replace('http:', '');
    } else if (url.indexOf('https:') === 0) {
        return url.replace('https:', '');
    } else if (url.indexOf('/') === 0) {
        return `/${url}`;
    } else {
        return `//${url}`;
    }
};

export { handleUrl };
