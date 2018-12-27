import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Table extends React.PureComponent {
    static propTypes = {
        dataSource: PropTypes.array,
        columns: PropTypes.array,
    };

    static defaultProps = {};

    state = {
        _dataSource: this.props.dataSource,
    };

    componentDidMount() {
        this.formatDataSource();
    }

    // 对dataSource内容拓展，插入自定义的列内容
    formatDataSource() {
        const { dataSource, columns } = this.props;
        // 深拷贝一下
        let new_dataSource = JSON.parse(JSON.stringify(dataSource));

        for (let i = 0; i < columns.length; i++) {
            const c_item = columns[i];

            for (let j = 0; j < new_dataSource.length; j++) {
                const d_item = new_dataSource[j];

                if (!d_item[c_item.dataIndex]) {
                    d_item[c_item.dataIndex] = 'extended';
                }
            }
        }
        // 把拓展后的对象转化一下，不然后面遍历有问题
        const new_dataSource_bak = JSON.parse(JSON.stringify(new_dataSource));

        this.setState({
            _dataSource: new_dataSource_bak,
        });
    }

    renderRow(item, index) {
        const { dataSource, columns } = this.props;

        console.log(dataSource);

        // 数据对象渲染
        return Object.keys(item).map((_item, _index) => {
            const rowContent = item[columns[_index].dataIndex] ? item[columns[_index].dataIndex] : '';
            const rowRender = columns[_index].render ? columns[_index].render : '';

            if (rowRender) {
                return (
                    <td key={_index}>
                        {(() => {
                            return rowRender(rowContent ? rowContent : undefined, dataSource[index], index);
                        })()}
                    </td>
                );
            }

            return <td key={_index}>{rowContent}</td>;
        });
    }

    render() {
        const { columns } = this.props;
        const { _dataSource } = this.state;

        return (
            <React.Fragment>
                <div className={styles.table}>
                    <table>
                        <thead>
                            <tr>
                                {columns.map((item, index) => {
                                    return (
                                        <td
                                            key={index}
                                            style={{ width: item.width ? `${item.width}px` : '' }}
                                            data-col-index={index}>
                                            {item.title}
                                        </td>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {_dataSource.map((item, index) => {
                                return (
                                    <tr key={index} ref={`row-${index}`} data-row-index={index}>
                                        {this.renderRow(item, index)}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Table);
