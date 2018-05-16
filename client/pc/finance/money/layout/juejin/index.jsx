import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import CommonTitleL from './../commonTitleL/';
import Licaisudi from './../licaisudi/';
import HotFunds from '../hotfunds/';

class Juejin extends React.PureComponent {
    /**
     * 渲染组件
     */

    render() {
        const { content } = this.props;

        return (
            <div className={style.juej}>
                <Chip
                    id="10039"
                    type="static"
                    title="境内掘金title"
                    groupName="首屏"
                    content={content.jingneijuejinTitle}>
                    <CommonTitleL />
                </Chip>

                <div className="clearfix  pt20">
                    <HotFunds content={content} />
                    <Licaisudi
                        content={{
                            title: content.sudiTitle01,
                            titleChipConfig: { id: '10045', group: '首屏', name: '理财速递title' },
                            content: content.sudiContent01,
                            contentChipConfig: { id: '10048', group: '首屏', name: '境内理财速递content' },
                        }}
                    />
                </div>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
Juejin.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Juejin.defaultProps = {};

export { Juejin };
export default Juejin;
