/**
 * 根据字符串日期 获取 js Date 类型
 * @param strDateTime
 */
const getJSDateFormString = strDateTime => {
    let newDate = null;
    let arrDate = new Array();
    let arrTime = new Array();

    if (strDateTime != null && strDateTime !== '') {
        // 获取日期和时间数组
        if (strDateTime.toString().indexOf('-') !== -1) {
            const item = strDateTime.split(' ');

            arrDate = item[0].toString().split('-');
            arrTime = item[1].toString().split(':');
        } else if (strDateTime.toString().indexOf('/') !== -1) {
            const item = strDateTime.split(' ');

            arrDate = item[0].toString().split('/');
            arrTime = item[1].toString().split(':');
        } else if (!isNaN(Number(strDateTime))) {
            // unix 时间戳
            newDate = new Date(Number(strDateTime) * 1000);

            return newDate;
        }

        // 处理数据
        if (
            arrDate !== undefined &&
            arrTime !== undefined &&
            arrDate.length === 3 &&
            arrTime.length === 3 &&
            (newDate === undefined || newDate == null)
        ) {
            newDate = new Date(
                parseInt(arrDate[0]),
                parseInt(Number(arrDate[1]) - 1),
                parseInt(arrDate[2]),
                parseInt(arrTime[0]),
                parseInt(arrTime[1]),
                parseInt(arrTime[2]),
            );

            return newDate;
        }
    } else return null;
};

/**
 * 获取两时间差
 * @param beginDate
 * @param endDate
 *
 * @return array() / null
 */
const getTimediff = (beginDate, endDate) => {
    console.log(beginDate, endDate);
    if (beginDate !== null && beginDate !== '' && endDate !== null && endDate !== '') {
        beginDate = typeof beginDate == 'string' ? getJSDateFormString(beginDate) : beginDate;
        endDate = typeof endDate == 'string' ? getJSDateFormString(endDate) : endDate;

        if (beginDate != null && endDate != null) {
            // 转换为 unix 时间戳
            beginDate = Math.round(beginDate.getTime() / 1000);
            // 转换为 unix 时间戳
            endDate = Math.round(endDate.getTime() / 1000);

            const timediff = Math.abs(endDate - beginDate);

            let remain = timediff % 86400;
            const hours = parseInt(remain / 3600);

            /* eslint-disable */
            remain = remain % 3600;
            /* eslint-enable */

            const mins = parseInt(remain / 60);
            const secs = remain % 60;

            return [parseInt(timediff / 86400), hours, mins, secs];
        } else return null;
    } else return null;
};

/**
 * 时间格式化
 *
 * @param strDateTime:需要格式化的字符串时间
 * @param intType：   格式化类型
 *
 * @return string
 */
export const formatDateTime = (strDateTime, intType) => {
    let years = null;
    let month = null;
    let days = null;
    let hours = null;
    let minutes = null;
    let seconds = null;

    try {
        if (strDateTime !== undefined && strDateTime != null && strDateTime !== '') {
            let newDate = getJSDateFormString(strDateTime);

            switch (Number(intType)) {
                // 格式:yyyy-MM-dd
                case 1:
                    years = newDate.getFullYear();
                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;
                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    newDate = `${years}-${month}-${days}`;
                    break;
                // 格式:MM-dd HH:mm
                case 2:
                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    newDate = `${month}-${days}-${hours}:${minutes}`;
                    break;
                // 格式:HH:mm:ss
                case 3:
                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    seconds = newDate.getSeconds();
                    if (Number(seconds) < 10) seconds = `0${seconds}`;

                    newDate = `${hours}:${minutes}:${seconds}`;
                    break;
                // 格式:HH:mm
                case 4:
                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    newDate = `${hours}:${minutes}`;
                    break;
                // 格式:yyyy-MM-dd HH:mm
                case 5:
                    years = newDate.getFullYear();

                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    newDate = `${years}-${month}-${days}-${hours}:${minutes}`;
                    break;
                // 格式:yyyy/MM/dd
                case 6:
                    years = newDate.getFullYear();
                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    newDate = `${years}/${month}/${days}`;
                    break;
                // 格式:MM/dd HH:mm
                case 7:
                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    newDate = `${month}/${days} ${hours}:${minutes}`;
                    break;
                // 格式:yyyy/MM/dd HH:mm
                case 8:
                    years = newDate.getFullYear();
                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    newDate = `${years}/${month}/${days} ${hours}:${minutes}`;
                    break;
                // 格式:yy-MM-dd
                case 9:
                    years = newDate.getFullYear();
                    years = years.toString().substr(2, 2);

                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    newDate = `${years}-${month}-${days}`;
                    break;
                // 格式:yy/MM/dd
                case 10:
                    years = newDate.getFullYear();
                    years = years.toString().substr(2, 2);

                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    newDate = `${years}/${month}/${days}`;
                    break;
                // 格式:yyyy年MM月dd hh:mm:ss
                case 11:
                    years = newDate.getFullYear();

                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    seconds = newDate.getSeconds();
                    if (Number(seconds) < 10) seconds = `0${seconds}`;

                    newDate = `${years}年${month}月${days} ${hours}:${hours}:${minutes}:${seconds}`;
                    break;
                // 格式:yyyyMMdd
                case 12:
                    years = newDate.getFullYear();

                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    newDate = years.toString() + month.toString() + days.toString();
                    break;
                // 格式:MM-dd hh:mm:ss
                case 13:
                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    seconds = newDate.getSeconds();
                    if (Number(seconds) < 10) seconds = `0${seconds}`;

                    newDate = `${month}-${days} ${hours}:${minutes}:${seconds}`;
                    break;
                // 格式:yyyy-MM-dd HH:mm:ss
                case 14:
                    years = newDate.getFullYear();

                    month = newDate.getMonth() + 1;
                    if (Number(month) < 10) month = `0${month}`;

                    days = newDate.getDate();
                    if (Number(days) < 10) days = `0${days}`;

                    hours = newDate.getHours();
                    if (Number(hours) < 10) hours = `0${hours}`;

                    minutes = newDate.getMinutes();
                    if (Number(minutes) < 10) minutes = `0${minutes}`;

                    seconds = newDate.getSeconds();
                    if (Number(seconds) < 10) seconds = `0${seconds}`;

                    newDate = `${years}-${month}-${days} ${hours}:${minutes}:${seconds}`;
                    break;
            }

            return newDate;
        }
    } catch (e) {
        const newDate = new Date();

        const getMonth = newDate.getMonth() + 1;

        return `${newDate.getFullYear()}-${getMonth}-${newDate.getDate()} ${newDate.getHours()}:${newDate.getMinutes()}:${newDate.getSeconds()}`;
    }
};

/**
 * 时间格式化2
 *
 * @param strDateTime:需要格式化的字符串时间
 * @return string  与当前相差一天 就按格式的类型显示，否则就 显示为 "13小时前" 或 "35分钟前"等
 */
export const formatDateTime2 = strDateTime => {
    if (strDateTime != null && strDateTime !== '') {
        const timeDiff = getTimediff(strDateTime, new Date());

        if (timeDiff != null && timeDiff.length === 4) {
            if (timeDiff[0] > 0 || timeDiff[1] > 24) {
                return formatDateTime(strDateTime, 1);
            } else {
                if (timeDiff[1] > 0) {
                    return `${timeDiff[1]}小时前`;
                } else if (timeDiff[2] > 0) {
                    return `${timeDiff[2]}分钟前`;
                }

                return `${timeDiff[3]}秒前`;
            }
        }

        return '';
    }

    return '';
};

/**
 * 计算某日与今日相隔天数
 *
 * @param creatTime 字符串时间 yyyy-MM-dd hh:mm:ss
 * @return number 相隔时间天数
 */

export const checkTimeDiff = creatTime => {
    let dateSpan = '';
    let iDays = '';

    let sDate1 = Date.parse(creatTime.replace(/-/g, '/'));
    let sDate2 = new Date().getTime();

    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));

    return iDays;
};
