import React from 'react';
import Header from './components/Header';
import Content from './components/Content';
import Sider from './components/Sider';
import Footer from './components/Footer';
import Chip from 'Chip';
import ChipEdit from 'ChipEdit';
import styles from './index.css';

class Comp extends React.Component {
    render() {
        return (
            <div>
                <ChipEdit />
                <Chip
                    id="7"
                    type="static"
                    title="通用头部通用头部通用头部通用头部"
                    groupName="静态碎片"
                    content={jsonData.header}>
                    <Header />
                </Chip>
                <div className={styles.layout}>
                    <div className={styles.main}>
                        <Content />
                    </div>
                    <div className={styles.sider}>
                        <Chip
                            id="25"
                            type="active"
                            position="relative"
                            title="推荐位一"
                            groupName="推荐位"
                            content={jsonData.siderList}>
                            <Sider />
                        </Chip>
                        <br />
                        <Chip id="2" type="active" title="推荐位二" groupName="推荐位" content={jsonData.siderList}>
                            <Sider />
                        </Chip>
                    </div>
                </div>
                <Chip id="4" type="static" title="" title="通用底部" groupName="静态碎片" content={jsonData.header}>
                    <Footer />
                </Chip>
            </div>
        );
    }
}

export default Comp;
