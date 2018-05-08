import React from 'react';
import PropTypes from 'prop-types';
import Chip from 'Chip';
import style from './style.css';
import '../../reset.css';
import { rel } from '../../../../../utils/rel';
import CommonTitleL from './../commonTitleL/';
import Licaisudi from './../licaisudi/';
// import HotFunds from '../hotFunds/';
import HotFundsTable from '../hotfundsTable/';

class Taojin extends React.PureComponent {
    /**
     * 渲染组件
     */

    render() {
        const { content } = this.props;

        return (
            <div className={style.juej}>
                <Chip
                    id="10110"
                    type="static"
                    title="海外淘金title"
                    groupName="首屏"
                    content={content.haiwaitaojinTitle}>
                    <CommonTitleL />
                </Chip>

                <div className="clearfix  pt20">
                    <div className="w240 fl" cmpp-type="s">
                        <div className={style.title_05}>短期收益较高产品</div>

                        <div>
                            <HotFundsTable
                                content={content.haiwaiHotfunds}
                                head={[
                                    { txt: '简称', tdKey: 'name' },
                                    { txt: '近一个月收益', tdKey: 'oneMonth' },
                                    { txt: '操作', tdKey: false },
                                ]}
                            />
                        </div>
                    </div>

                    <Licaisudi
                        content={{
                            title: content.sudiTitle02,
                            titleChipConfig: { id: '10045', group: '首屏', name: '理财速递title' },
                            content: content.sudiContent02,
                            contentChipConfig: { id: '10111', group: '首屏', name: '海外理财速递content' },
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
Taojin.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
Taojin.defaultProps = {};

export { Taojin };
export default Taojin;
