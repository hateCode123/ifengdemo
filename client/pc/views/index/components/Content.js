import React from 'react';

class Comp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: jsonData.mainContent,
        };
    }
    createMarkup = () => {
        return {__html: this.state.content};
    }
    render() {
        return <div dangerouslySetInnerHTML={this.createMarkup()}></div>;
    }
}

export default Comp;
