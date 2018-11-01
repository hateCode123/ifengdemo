import React from 'react';
import PropTypes from 'prop-types';

class TitleAd extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    /**
     * 插入 html
     */
    createMarkup = () => {
        return { __html: this.props.content };
    };

    /**
     * 渲染组件
     */
    render() {
        return <span style={{ float: 'right' }} dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

export default TitleAd;
