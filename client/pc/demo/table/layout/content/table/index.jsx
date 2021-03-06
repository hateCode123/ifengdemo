import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

class Table extends React.PureComponent {
    static propTypes = {
        dataSource: PropTypes.array,
        columns: PropTypes.array,
        emptyText: PropTypes.string,
        configClass: PropTypes.string
    };

    static defaultProps = {
        emptyText: '暂无数据',
    };

    state = {
        _dataSource: this.props.dataSource,
    };

    componentDidMount() {
        this.formatDataSource();
    }

    // 更新表格数据
    static getDerivedStateFromProps(props, state) {
        if (props.dataSource !== state._dataSource) {
            return { _dataSource: props.dataSource };
        }

        return null;
    }

    // 对dataSource内容拓展，插入自定义的列内容
    formatDataSource() {
        const { dataSource, columns } = this.props;

        // 深拷贝一下
        const new_dataSource = JSON.parse(JSON.stringify(dataSource));

        for (let i = 0; i < columns.length; i++) {
            const c_item = columns[i];

            for (let j = 0; j < new_dataSource.length; j++) {
                const d_item = new_dataSource[j];

                if (!d_item[c_item.dataIndex]) {
                    d_item[c_item.dataIndex] = '';
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

        // 数据对象渲染
        return Object.keys(item).map((_item, _index) => {
            if (!columns[_index]) return null;

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
        const { columns, dataSource, emptyText, configClass } = this.props;
        const { _dataSource } = this.state;

        return (
            <React.Fragment>
                <div className={styles.table}>
                    <table className={configClass}>
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
                            {dataSource.length > 0 ? null : (
                                <tr className={styles.nomore}>
                                    <td colSpan={columns.length}>{emptyText}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Table);
