import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

import {
  CalendarOutlined,
  DeleteOutlined,
  DollarOutlined,
  EditOutlined,
  HistoryOutlined,
  SearchOutlined,
  UnorderedListOutlined,
  UserAddOutlined,
} from "@ant-design/icons";

const MenuComponent = (props) => {
  return (
    <div>
      <Menu theme="dark" defaultSelectedKeys={["1"]} mode="inline">
        <Menu.Item key="1" icon={<SearchOutlined />}>
          <Link to="/search">Pesquisar</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<HistoryOutlined />}>
          <Link to="/history">Histórico</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UserAddOutlined />}>
          <Link to="/create">Criar</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<EditOutlined />}>
          <Link to="/update">Atualizar</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<DeleteOutlined />}>
          <Link to="/delete">Deletar</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<UnorderedListOutlined />}>
          <Link to="/health-plans">Planos de Saúde</Link>
        </Menu.Item>
        <Menu.Item key="7" icon={<CalendarOutlined />}>
          <Link to="/appointment">Consultas</Link>
        </Menu.Item>
        <Menu.Item key="8" icon={<DollarOutlined />}>
          <Link to="/payment">Gerar Cobrança</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default MenuComponent;
