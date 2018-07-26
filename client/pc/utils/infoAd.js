import { loadScript } from '@ifeng/ui_base';

const handleAd = async ad => {
    let callbackFn = null;

    try {
        if (ad.preload) {
            let list = [];
            let index = 0;

            if (typeof ad.preload === 'string') {
                list = [ad.preload];
            } else {
                list = ad.preload;
            }

            while (list.length > index) {
                const scriptUrl = list[index];

                console.log('load', scriptUrl);

                await loadScript(scriptUrl, { cache: false, reload: false });
                ++index;
            }
        }

        callbackFn = new Function(`return ${ad.callback}`)();
    } catch (error) {
        error.message = `AdError - ${error.message}`;

        console.error(error);

        if (window && window.BJ_REPORT) window.BJ_REPORT.report(error);
    }

    return callbackFn;
};

export { handleAd };
