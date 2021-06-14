import React from "react";
import { Layout } from "antd";

import Menu from "../Menu";
import Footer from "../Footer";
import Content from "../Content";
import "./Home.css";

const Home = () => {
  const { Sider } = Layout;

  const [collapsed, setCollapsed] = React.useState(false);

  const onCollapse = (collapsed) => {
    setCollapsed(collapsed);
  };
  return (
    <div>
      <Layout style={{ minHeight: "100vh" }}>
        {JSON.parse(localStorage.getItem("user_consultorio")) && (
          <Sider
            collapsed={window.screen.width < 576 ? true : collapsed}
            onCollapse={onCollapse}
            collapsible={window.screen.width < 576 ? false : true}
            defaultCollapsed={false}
          >
            <div className="logo" />
            <Menu />
          </Sider>
        )}

        <Layout className="site-layout">
          <Content />
          <Footer />
        </Layout>
      </Layout>
    </div>
  );
};

export default Home;
