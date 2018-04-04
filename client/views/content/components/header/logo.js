import React from 'react';
class Comp extends React.Component {
    render() {
        const { content } = this.props;
        return (
            <a href={content.url} target="_blank">
                <img src={content.src} alt={content.title} width={content.width} height={content.height} />
            </a>
        );
    }
}

export default Comp;
