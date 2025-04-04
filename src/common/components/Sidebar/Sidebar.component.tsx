import { Layout } from "antd";
import { CategoryFilter } from "../CategoryFilter";
import "./Sidebar.scss";

const { Sider } = Layout;

const SidebarComponent = ({
  isMobile,
  collapsed,
}: {
  isMobile: boolean;
  collapsed: boolean;
}) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={isMobile ? collapsed : false}
      width={isMobile ? "100vw" : 240}
      className={`sidebar ${collapsed ? "sidebar--collapsed" : ""}`}
    >
      <nav className="sidebar__content">
        <CategoryFilter />
      </nav>
    </Sider>
  );
};

export default SidebarComponent;
