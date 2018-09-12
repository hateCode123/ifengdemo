import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class TabPane extends React.PureComponent {
    static propTypes = {
        active: PropTypes.bool,
        children: PropTypes.any,
    };

    state = {
        isReady: this.props.active,
    };

    container = React.createRef();

    static getDerivedStateFromProps(nextProps, prevState) {
        if (prevState.isReady || !nextProps.active) {
            return prevState;
        } else {
            return {
                isReady: nextProps.active,
            };
        }
    }

    /**
     * 渲染组件
     */
    render() {
        const { active, children } = this.props;

        return this.state.isReady ? (
            <div className={active ? styles.tabBodyItemActive : styles.tabBodyItem}>
                {React.Children.map(children, item => React.cloneElement(item, { active }))}
            </div>
        ) : null;
    }
}

export default errorBoundary(TabPane);
