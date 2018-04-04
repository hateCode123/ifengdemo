import React from 'react';
class Footer extends React.Component {
    createMarkup = () => {
        return { __html: this.props.content };
    };
    render() {
        return <div dangerouslySetInnerHTML={this.createMarkup()} />;
    }
}

export default Footer;
