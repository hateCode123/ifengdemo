import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import ChipEdit from 'ChipEdit';
import transform from 'chipDataTransform';
import Header from './header';
import Content from './content';
import BottomFooter from './footer';
import errorBoundary from '@ifeng/errorBoundary';

class Layout extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const {
            content: { search, content, footer },
        } = this.props;

        return (
            <React.Fragment>
                <Header content={search} />
                <div className={styles.content}>
                    <Content content={content} />
                    <BottomFooter content={footer} />
                </div>
                <ChipEdit transform={transform} />
            </React.Fragment>
        );
    }
}

export default errorBoundary(Layout);
