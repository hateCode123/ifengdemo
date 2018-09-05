import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import { rel } from '../../../../../utils/rel';
import Chip from 'Chip';
import TitleR from '../../components/titleR';
class ClickRank extends React.PureComponent {
    render() {
        const { content } = this.props;
        const { clickRankTitle, clickRank } = content;

        const creatList = () => (
            <ul>
                {clickRank.map((item, index) => (
                    <li key={index}>
                        <span className={styles.sRed}>{index + 1}</span>
                        <a href={item.url} target="_blank" rel={rel}>
                            {item.title}
                        </a>
                    </li>
                ))}
            </ul>
        );

        return (
            <div className={styles.box300}>
                <Chip
                    id="10061"
                    type="static"
                    title="点击排行"
                    groupName="文章"
                    translate="jsonParse"
                    content={clickRankTitle}>
                    <TitleR content={clickRankTitle} />
                </Chip>
                <ul className={styles.rank_list}>{clickRank.length > 0 ? creatList() : ''}</ul>
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
ClickRank.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
ClickRank.defaultProps = {};

export default ClickRank;
