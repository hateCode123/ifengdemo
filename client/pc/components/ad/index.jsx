import React from 'react';
import PropTypes from 'prop-types';
import './index.css';
import { loadScript } from '@ifeng/ui_base';

const scriptLoadedGroups = {};

/**
 * 定义 Ad 组件
 */
class Ad extends React.PureComponent {
    async componentDidMount() {
        const { content } = this.props;

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
                if (!scriptLoadedGroups[scriptUrl]) {
                    scriptLoadedGroups[scriptUrl] = loadScript(scriptUrl, { cache: false });
                }
                await scriptLoadedGroups[scriptUrl];
                ++index;
            }
        }

        const callbackFn = new Function(`return ${content.callback}`)();

        // console.log('elm', callbackFn);

        callbackFn(this.container, content.data);

        // console.log(this.container);
    }

    /**
     * 渲染组件
     */
    render() {
        const { styleName } = this.props;

        return <div className={styleName} adblock="true" ref={n => (this.container = n)} />;
    }
}

/**
 * 定义组件属性类型
 * */
Ad.propTypes = {
    content: PropTypes.object,
    styleName: PropTypes.string,
};

/**
 * 定义组件默认属性
 * */
Ad.defaultProps = {};

export { Ad };
export default Ad;
