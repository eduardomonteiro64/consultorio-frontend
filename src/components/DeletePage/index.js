import React from "react";
import axios from "axios";
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  Space,
  Card,
  Button,
  Modal,
} from "antd";

const DeletePage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Search } = Input;

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [state, setState] = React.useState(undefined);

  const url = "http://localhost:3003/api/userDataEndpoint";

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    axios.delete(`${url}/${state._id}`).then((resp) => setState(resp.data));
    alert("Usuário deletado com sucesso!");
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onSearch = (value) => {
    axios
      .get(`${url}/?stateDocument=${value}`)
      .then((resp) => setState(resp.data[0]));
    setIsModalVisible(false);
  };

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 720, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Deletar Usuário</Title>
            <Col sm={22} xs={24} align="middle">
              <Search
                placeholder="Digite o documento do usuário"
                allowClear
                enterButton="Buscar"
                size={window.screen.width < 576 ? "small" : "large"}
                onSearch={onSearch}
                style={{ margin: 20 }}
              />
            </Col>
            <Space direction="vertical">
              {state && state !== undefined ? (
                <Card
                  title="Informações"
                  style={{ width: window.screen.width < 576 ? 200 : 300 }}
                >
                  <p>Nome: {state.name}</p>
                  <p>Documento: {state.stateDocument}</p>
                  <Button type="primary" danger onClick={showModal}>
                    Deletar
                  </Button>
                  <Modal
                    title="Deletar Usuário"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText="Voltar"
                    okButtonProps={{ danger: true }}
                  >
                    <p>
                      Tem certeza que deseja deletar o usuário {state.name}?
                    </p>
                  </Modal>
                </Card>
              ) : (
                ""
              )}
            </Space>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default DeletePage;
