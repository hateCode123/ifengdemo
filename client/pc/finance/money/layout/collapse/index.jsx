import React from 'react';
import PropTypes from 'prop-types';
import { rel } from '../../../../utils/rel';
import style from './style.css';
import errorBoundary from '@ifeng/errorBoundary';
import '../../reset.css';

class TopCollapse extends React.PureComponent {
    static propTypes = {
        content: PropTypes.object,
        init: PropTypes.bool,
    };

    state = {
        open: 0,
    };
    // UNSAFE_componentWillReceiveProps
    componentDidMount(nextProps) {
        // if (nextProps.init && nextProps.init !== this.props.init) {
        this.timer1 = setTimeout(() => {
            this.setState({ open: 1 });
        }, 100);

        this.timer2 = setTimeout(() => {
            clearTimeout(this.timer1);
            this.setState({ open: 0 });
        }, 6000);
        // }
    }

    componentWillUnmount() {
        clearTimeout(this.timer1);
        clearTimeout(this.timer2);
    }

    render() {
        const { content, init } = this.props;
        const { url, img } = content;
        const { open } = this.state;

        return (
            <div className="w1000">
                <div className={style.col} style={{ position: 'relative' }}>
                    <div
                        className={style.box_fixed}
                        style={
                            open === 1
                                ? { height: '200px', backgroundImage: { img } }
                                : { height: '0', backgroundImage: { img } }
                        }>
                        <div className={style.box_posr}>
                            <a href={url} target="_blank" rel={rel} style={{ display: 'none' }} />
                            {/* <span className={style.span_close} id="span_close" /> */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default errorBoundary(TopCollapse);
