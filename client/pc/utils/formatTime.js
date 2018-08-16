const formatTime = timeStr => {
    const year = timeStr.slice(0, 4);
    const month = timeStr.slice(5, 10);
    const time = timeStr.slice(11, 16);

    const newsTime = new Date(timeStr);
    const today = new Date();

    // 判断是否是今天,今年
    if (newsTime.toDateString() === today.toDateString()) {
        return `今天 ${time}`;
    } else if (Number(year) === today.getFullYear()) {
        return `${month} ${time}`;
    } else {
        return `${year} ${month} ${time}`;
    }
};

export { formatTime };
