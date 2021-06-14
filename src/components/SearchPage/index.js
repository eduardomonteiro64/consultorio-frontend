import React from "react";
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
  Descriptions,
} from "antd";
import axios from "axios";

const SearchPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Search } = Input;

  const url = "http://localhost:3003/api/userDataEndpoint";

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [state, setState] = React.useState(undefined);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
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
            <Title>Pesquisar Usuário</Title>
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
                  <Button type="primary" onClick={showModal}>
                    Ver Ficha Completa
                  </Button>
                  <Modal
                    title="Informação do Usuário"
                    visible={isModalVisible}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    cancelText="Voltar"
                  >
                    <Descriptions layout="vertical">
                      <Descriptions.Item label="Nome Completo">
                        {state.name}
                      </Descriptions.Item>
                      <Descriptions.Item label="Genero">
                        {state && state.gender === "male"
                          ? "Masculino"
                          : "Feminino"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Data de Nascimento">
                        {state.birthDate
                          ? state.birthDate.substring(0, 10)
                          : ""}
                      </Descriptions.Item>
                      <Descriptions.Item label="Telefone/Celular">
                        {state.telephone}
                      </Descriptions.Item>
                      <Descriptions.Item label="Rua e Número" span={2}>
                        {state.streetName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Bairro">
                        {state.districtName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Estado/Cidade">
                        {state.cityName}
                      </Descriptions.Item>
                      <Descriptions.Item label="CPF">
                        {state.federalDocument}
                      </Descriptions.Item>
                      <Descriptions.Item label="RG">
                        {state.stateDocument}
                      </Descriptions.Item>
                    </Descriptions>
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

export default SearchPage;
