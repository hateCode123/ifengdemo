import React from 'react';
import PropTypes from 'prop-types';
import style from './style.css';
import '../../reset.css';
import Search from '@ifeng/ui_pc_search';
import errorBoundary from '@ifeng/errorBoundary';

class Inner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    createHtml = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div className={style.h_theLogo} dangerouslySetInnerHTML={this.createHtml()} />;
    }
}

class Banner extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
    };

    render() {
        const { content } = this.props;

        return (
            <div className={style.h_searchDiv}>
                <Inner content={content.bannerLogo} />
                <Search content={content.search} />
            </div>
        );
    }
}

export default errorBoundary(Banner);
