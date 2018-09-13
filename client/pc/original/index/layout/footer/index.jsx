import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import Chip from 'Chip';
import Footer from '../../../../components/footer';
import errorBoundary from '@ifeng/errorBoundary';

/**
 * 定义 Footer 组件
 */
class BottomFooter extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    /**
     * 渲染组件
     */
    render() {
        const { content } = this.props;

        return (
            <div key="footer" className={styles.footer}>
                <Chip id="20012" type="struct" title="底部公用版权" groupName="底部" content={content}>
                    <Footer />
                </Chip>
            </div>
        );
    }
}

export default errorBoundary(BottomFooter);
