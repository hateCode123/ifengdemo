import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';
import CommonTitleL from './../commonTitleL/';
import Licaisudi from './../licaisudi/';
import HotFunds from '../hotFunds/';

class Juejin extends React.PureComponent {
    /**
     * 渲染组件
     */

    render() {
        const { content } = this.props;

        return (
            <div className="juej">
                <Chip
                    id="10039"
                    type="static"
                    title="境内掘金title"
                    groupName="首屏"
                    content={content.jingneijuejinTitle}>
                    <CommonTitleL />
                </Chip>
                
                <div className="clearfix  pt20">
                    <HotFunds content={content.hotFounds} />
                    <Licaisudi content={{ title: content.sudiTitle01, content: content.sudiContent01 }} />
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
