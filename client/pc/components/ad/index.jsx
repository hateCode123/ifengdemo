import React from 'react';
import PropTypes from 'prop-types';
import { loadScript } from '@ifeng/ui_base';

/**
 * 定义 Ad 组件
 */
class Ad extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
        styleName: PropTypes.string,
    };

    async componentDidMount() {
        const { content } = this.props;

        try {
            if (content.preload) {
                let list = [];
                let index = 0;

                if (typeof content.preload === 'string') {
                    list = [content.preload];
                } else {
                    list = content.preload;
                }

                while (list.length > index) {
                    const scriptUrl = list[index];

                    console.log('load', scriptUrl);

                    await loadScript(scriptUrl, { cache: false, reload: false });
                    ++index;
                }
            }

            const callbackFn = new Function(`return ${content.callback}`)();

            // console.log('elm', callbackFn);

            callbackFn(this.container, content.data);

            // console.log(this.container);
        } catch (error) {
            error.message = `AdError - ${error.message}`;

            console.error(error);

            if (window && window.BJ_REPORT) window.BJ_REPORT.report(error);
        }
    }

    /**
     * 渲染组件
     */
    render() {
        const { styleName } = this.props;

        return <div className={styleName} ref={n => (this.container = n)} />;
    }
}

export { Ad };
export default Ad;
