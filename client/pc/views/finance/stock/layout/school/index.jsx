import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import HeadTitle from '../../components/headTitle/';
import { Ad } from '../../../../../components/ad';
import ResearchSearch from './researchSearch/';
import Caption from '../../components/caption';
import NewsList from '../../components/newsList';

class School extends React.PureComponent {
    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;
        const logsList = content.logs.list;
        const schoolList = content.school.list;

        return (
            <div className={`${styles.school} clearfix`}>
                <HeadTitle content={content.schoolTitle}>
                    <ResearchSearch />
                </HeadTitle>
                <div className={styles.col_L}>
                    <div className={styles.box}>
                        <Caption content={content.schoolSubTitle1} />
                        {logsList.length > 0 ? <NewsList content={logsList} limit={6} /> : ''}
                    </div>
                    <div className={styles.box}>
                        <Caption content={content.schoolSubTitle2} />
                        {schoolList.length > 0 ? <NewsList content={schoolList} limit={6} /> : ''}
                    </div>
                    <div className={styles.ad}>
                        <Ad content={content.schoolAd} styleName={styles.ad_box} />
                    </div>
                </div>
                <div className={styles.col_R} />
            </div>
        );
    }
}

/**
 * 定义组件属性类型
 * */
School.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
School.defaultProps = {};

export { School };
export default School;
