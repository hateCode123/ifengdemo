import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.css';
import errorBoundary from '@ifeng/errorBoundary';

import Table from './table';
class Content extends React.PureComponent {
    // static propTypes = {
    //     content: PropTypes.object,
    // };
    state = {};

    render() {
        const list = [{ NO1: 1, NO2: 2, NO3: 3 }, { NO1: 4, NO2: 5, NO3: 6 }, { NO1: 7, NO2: 8, NO3: 9 }];
        const list1 = [];

        const column = [
            {
                title: 'No.1',
                width: 100,
                dataIndex: 'NO1',
            },
            {
                title: 'No.2',
                dataIndex: 'NO2',
                render: (text, record) => {
                    return <div style={{ color: 'red' }}>{record.NO2}</div>;
                },
            },
            {
                title: 'No.3',
                dataIndex: 'NO3',
                render: (text, record) => {
                    return (
                        <button
                            onClick={() => {
                                console.log(text);
                                console.log(record);
                            }}>
                            按钮
                        </button>
                    );
                },
            },
            {
                title: 'No.4',
                dataIndex: 'NO4',
                render: (text, record) => {
                    return (
                        <button
                            onClick={() => {
                                console.log(text);
                                console.log(record);
                            }}>
                            按钮
                        </button>
                    );
                },
            },
        ];

        return (
            <React.Fragment>
                <div style={{ marginLeft: '300px', marginTop: '100px' }}>
                    <Table dataSource={list} columns={column} emptyText={'暂无数据哦'} />
                </div>
                <div style={{ marginLeft: '300px', marginTop: '100px' }}>
                    <Table dataSource={list1} columns={column} emptyText={'暂无数据哦'} />
                </div>
            </React.Fragment>
        );
    }
}

export default errorBoundary(Content);
