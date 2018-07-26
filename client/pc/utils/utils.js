const handleUrl = url => {
    if (url.indexOf('http') === 0 || url.indexOf('//') === 0) {
        return url;
    } else if (url.indexOf('/') === 0) {
        return `/${url}`;
    } else {
        return `//${url}`;
    }
};

export { handleUrl };
