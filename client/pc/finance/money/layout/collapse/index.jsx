import React from 'react';
import PropTypes from 'prop-types';
import { rel } from '../../../../utils/rel';
import style from './style.css';
import '../../reset.css';

class TopCollapse extends React.PureComponent {

    state = {
        open: 1,
    };

    componentWillReceiveProps(nextProps) {

        if (nextProps.init && nextProps.init !== this.props.init) {
        
            setTimeout(() => {
                this.setState({ open: 0 });
            }, 6000);
        }

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
                            init && open === 1
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

/**
 * 定义组件属性类型
 * */
TopCollapse.propTypes = { content: PropTypes.object };

/**
 * 定义组件默认属性
 * */
TopCollapse.defaultProps = {};
export { TopCollapse };
export default TopCollapse;
