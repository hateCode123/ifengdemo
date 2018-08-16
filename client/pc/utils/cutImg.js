const getImage = (smallPoster, w, h) => {
    if (smallPoster.indexOf('img.ifeng.com')) {
        smallPoster = smallPoster.replace('img.ifeng.com', 'y1.ifengimg.com');
    }

    if (smallPoster.indexOf('http://d.ifengimg.com/') > -1) {
        if (smallPoster.indexOf('http://d.ifengimg.com/q100/') > -1) {
            return smallPoster.replace('http://d.ifengimg.com/q100/', `https://d.ifengimg.com/w${w}_h${h}/`);
        }
        const posterReg = /[w]\d{1,}[_][h]\d{1,}/;
        const posterInd = smallPoster.indexOf(posterReg.exec(smallPoster));
        const posterStr = smallPoster.match(posterReg);

        return `http://d.ifengimg.com/w${w}_h${h}${smallPoster.split(posterStr)[1]}`;
    } else if (smallPoster.indexOf('https://d.ifengimg.com/') > -1) {
        if (smallPoster.indexOf('https://d.ifengimg.com/q100/') > -1) {
            return smallPoster.replace('https://d.ifengimg.com/q100/', `https://d.ifengimg.com/w${w}_h${h}/`);
        }
        const posterReg = /[w]\d{1,}[_][h]\d{1,}/;
        const posterInd = smallPoster.indexOf(posterReg.exec(smallPoster));
        const posterStr = smallPoster.match(posterReg);

        return `https://d.ifengimg.com/w${w}_h${h}${smallPoster.split(posterStr)[1]}`;
    } else if (smallPoster.indexOf('https://') > -1) {
        smallPoster = smallPoster.replace('https://', '');

        return `https://d.ifengimg.com/w${w}_h${h}/${smallPoster}`;
    } else {
        smallPoster = smallPoster.replace('http://', '');

        return `https://d.ifengimg.com/w${w}_h${h}/${smallPoster}`;
    }
};

export { getImage };
