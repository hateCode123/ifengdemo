import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import errorBoundary from '../../../../../components/errorBoundary';
import dataProcessing from '../../../../../components/dataProcessing';
import Nav from './nav/';
import SubNav from './subNav/';

class Navigation extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div className={styles.banner}>
                <Chip id="10038" type="static" title="股票导航" groupName="导航栏" content={content.nav}>
                    <Nav content={content.nav} />
                </Chip>
                <Chip id="10040" type="static" title="股票二级导航" groupName="导航栏" content={content.subNav}>
                    <SubNav content={content.subNav} />
                </Chip>
            </div>
        );
    }
}

export default errorBoundary(dataProcessing(Navigation));
