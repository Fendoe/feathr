import { Layout, Menu, Typography } from "antd";
import {
  ControlOutlined,
  CopyOutlined,
  DatabaseOutlined,
  EyeOutlined,
  HomeOutlined,
  ProjectOutlined,
  RocketOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { ItemType } from "antd/lib/menu/hooks/useItems";

const { Title } = Typography;
const { Sider } = Layout;

const SideMenu = () => {
  const enableRBAC = window.environment?.enableRBAC;
  const showManagement = enableRBAC
    ? enableRBAC
    : process.env.REACT_APP_ENABLE_RBAC;

  const menuItems: ItemType[] = [];

  return (
    <Sider theme="dark">
      <Title
        level={1}
        style={{
          fontSize: "36px",
          color: "white",
          margin: "10px",
          paddingLeft: "35px",
        }}
      >
        Feathr
      </Title>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["/"]}
        defaultOpenKeys={["/"]}
        // items={menuItems}
      >
        <Menu.Item
          key="/home"
          icon={<HomeOutlined style={{ fontSize: "20px", color: "#e28743" }} />}
        >
          <Link to="/home">Home</Link>
        </Menu.Item>
        <Menu.Item
          key="/projects"
          icon={
            <ProjectOutlined style={{ fontSize: "20px", color: "#177ddc" }} />
          }
        >
          <Link to="/projects">Projects</Link>
        </Menu.Item>
        <Menu.Item
          key="/dataSources"
          icon={
            <DatabaseOutlined style={{ fontSize: "20px", color: "#13a8a8" }} />
          }
        >
          <Link to="/dataSources">Data Sources</Link>
        </Menu.Item>
        <Menu.Item
          key="/features"
          icon={<CopyOutlined style={{ fontSize: "20px", color: "#d89614" }} />}
        >
          <Link to="/features">Features</Link>
        </Menu.Item>
        <Menu.Item
          key="/jobs"
          icon={
            <RocketOutlined style={{ fontSize: "20px", color: "#642ab5" }} />
          }
        >
          <Link to="/jobs">Jobs</Link>
        </Menu.Item>
        <Menu.Item
          key="/monitoring"
          icon={<EyeOutlined style={{ fontSize: "20px", color: "#e84749" }} />}
        >
          <Link to="/monitoring">Monitoring</Link>
        </Menu.Item>
        {showManagement === "true" && (
          <Menu.Item
            key="/management"
            icon={
              <ControlOutlined style={{ fontSize: "20px", color: "#6495ed" }} />
            }
          >
            <Link to="/management">Management</Link>
          </Menu.Item>
        )}
      </Menu>
    </Sider>
  );
};

export default SideMenu;
