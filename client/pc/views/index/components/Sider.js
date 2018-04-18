import React from 'react';

class Comp extends React.Component {
    render() {
        const {content} = this.props;
        return (
            <div style={{position: 'relative'}}>
                <ul>
                    {content.map((item, index) => (
                        <li key={index}>
                            <a href={item.href}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default Comp;
