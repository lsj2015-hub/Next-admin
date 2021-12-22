import { Layout, Menu, Breadcrumb } from 'antd';
import {
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import BaseLayout from '../components/containers/BaseLayout';

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default function Home() {
  return <BaseLayout>Index Page</BaseLayout>;
}
