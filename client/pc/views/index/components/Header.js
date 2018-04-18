import React from 'react';
import './header.css';
class Comp extends React.Component {
    createMarkup = () => {
        return {__html: this.props.content};
    }
    render() {
        return <div dangerouslySetInnerHTML={this.createMarkup()}></div>;
    }
}

export default Comp;
