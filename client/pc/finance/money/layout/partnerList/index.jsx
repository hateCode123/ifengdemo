import React from 'react';
import PropTypes from 'prop-types';

class PartnerList extends React.PureComponent {
    static propTypes = {
        content: PropTypes.string,
    };

    createHtml = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div dangerouslySetInnerHTML={this.createHtml()} />;
    }
}

export default PartnerList;
