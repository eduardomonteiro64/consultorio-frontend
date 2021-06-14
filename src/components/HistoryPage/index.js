import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  List,
  Card,
  Button,
  Modal,
  Form,
  DatePicker,
} from "antd";
import axios from "axios";
import "moment/locale/pt-br";
import locale from "antd/es/date-picker/locale/pt_BR";

const HistoryPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Search } = Input;

  const [state, setState] = React.useState(undefined);

  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false);

  const [form] = Form.useForm();

  const url = "http://localhost:3003/api/userHistoryService";

  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  const handleOk = () => {
    setIsAddModalVisible(false);
  };

  const handleCancel = () => {
    setIsAddModalVisible(false);
  };

  const onFinish = (values) => {
    axios
      .post(url, {
        stateDocument: values.stateDocument,
        date: values.date,
        description: values.description,
      })
      .then((resp) => resp);
    alert("Consulta incluida com sucesso!");
    window.location.reload();
    form.resetFields();
  };

  const onFinishFailed = () => {
    alert("Faltam campos a serem preenchidos.");
  };

  const onClickDelete = (value) => {
    axios.delete(`${url}/${value}`).then((resp) => resp);
    alert("Consulta deletada com sucesso!");
    window.location.reload();
  };

  const onSearch = (value) => {
    axios
      .get(`${url}?stateDocument=${value}`)
      .then((resp) => setState({ ...state, userHistory: resp.data }));
    setIsAddModalVisible(false);
  };

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 720, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Histórico do Usuário</Title>
            <Col sm={22} xs={24} align="middle">
              <Search
                placeholder="Digite o documento do usuário"
                allowClear
                enterButton="Buscar"
                size={window.screen.width < 576 ? "small" : "large"}
                onSearch={onSearch}
                style={{ margin: 20 }}
              />
              {state && state.userHistory.length >= 1 ? (
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={state.userHistory}
                  renderItem={(item) => (
                    <List.Item>
                      <Card title={item.date.substring(0, 10)}>
                        {item.description}
                      </Card>

                      <Button
                        type="primary"
                        onClick={() => onClickDelete(item._id)}
                        danger
                        style={{ margin: 10 }}
                      >
                        Deletar consulta{" "}
                      </Button>
                    </List.Item>
                  )}
                />
              ) : (
                ""
              )}
              <Col align="end" style={{ marginTop: 50 }}>
                <Button type="primary" onClick={showAddModal}>
                  Adicionar Histórico
                </Button>
                <Modal
                  title="Adicionar Consulta"
                  visible={isAddModalVisible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  cancelButtonProps={{ style: { display: "none" } }}
                  okButtonProps={{ style: { display: "none" } }}
                >
                  <Form
                    name="historyPageForm"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Documento do Paciente"
                      name="stateDocument"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira um RG.",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Form.Item
                      name="date"
                      label="Data da Consulta"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira a data da consulta.",
                        },
                      ]}
                    >
                      <DatePicker locale={locale} format="DD/MM/YYYY" />
                    </Form.Item>
                    <Form.Item
                      label="Descrição da Consulta"
                      name="description"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira a descrição da consulta.",
                        },
                      ]}
                    >
                      <Input.TextArea />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Inserir
                    </Button>
                  </Form>
                </Modal>
              </Col>
            </Col>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default HistoryPage;
