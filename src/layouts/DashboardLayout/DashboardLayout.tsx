import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { Sidebar } from "../../common/components/Sidebar";
import { IconMenu2, IconX } from "@tabler/icons-react";
import "./DashboardLayout.scss";

const { Content } = Layout;

const DashboardLayout = ({ children }: { children?: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <Layout className="dashboard-layout">
      <Sidebar isMobile={isMobile} collapsed={collapsed} />

      <Layout style={{ width: "100%" }}>
        {isMobile && (
          <button className="toggle-sidebar-btn" onClick={toggleSidebar}>
            {collapsed ? <IconMenu2 size={24} /> : <IconX size={24} />}
          </button>
        )}
        <Content className="dashboard-layout__content">
          {children ?? <Outlet />}
        </Content>
      </Layout>
    </Layout>
  );
};

export default DashboardLayout;
