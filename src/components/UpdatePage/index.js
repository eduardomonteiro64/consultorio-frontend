import React from "react";
import {
  Layout,
  Descriptions,
  Row,
  Col,
  Typography,
  Input,
  Button,
  Drawer,
  Select,
  Form,
} from "antd";
import axios from "axios";

const UpdatePage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Search } = Input;
  const { Option } = Select;

  const [state, setState] = React.useState(undefined);

  const [visible, setVisible] = React.useState(false);

  const url = "http://localhost:3003/api/userDataEndpoint";

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = (value) => {
    setVisible(false);
  };

  const onSearch = (value) => {
    axios
      .get(`${url}/?stateDocument=${value}`)
      .then((resp) => setState(resp.data[0]));
    setVisible(false);
  };

  const onFinish = (values) => {
    axios
      .put(`${url}/${state._id}`, {
        birthDate: values.birthDate,
        cityName: values.cityName,
        districtName: values.districtName,
        federalDocument: values.federalDocument,
        gender: values.gender,
        name: values.name,
        postalNumber: values.postalNumber,
        stateDocument: values.stateDocument,
        stateName: values.stateName,
        streetName: values.streetName,
        telephone: values.telephone,
      })
      .then((resp) => setState(resp.data));
    setVisible(false);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setVisible(true);
  };

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 720, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Atualizar Usuário</Title>
            <Col sm={22} xs={24} align="middle">
              <Search
                placeholder="Digite o documento do usuário"
                allowClear
                enterButton="Buscar"
                size={window.screen.width < 576 ? "small" : "large"}
                onSearch={onSearch}
                style={{ margin: 20 }}
              />
              {state && state !== undefined ? (
                <>
                  <Descriptions layout="vertical">
                    <Descriptions.Item label="Nome Completo">
                      {state.name}
                    </Descriptions.Item>
                    <Descriptions.Item label="Genero">
                      {state.gender === "male" ? "Masculino" : "Feminino"}
                    </Descriptions.Item>
                    <Descriptions.Item label="Data de Nascimento">
                      {state.birthDate ? state.birthDate.substring(0, 10) : ""}
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
                  <Button type="primary" onClick={showDrawer}>
                    Editar
                  </Button>
                </>
              ) : (
                ""
              )}

              <Drawer
                title="Atualize os Dados"
                onClose={onClose}
                visible={visible}
                bodyStyle={{ paddingBottom: 80 }}
                footer={
                  <div
                    style={{
                      textAlign: "right",
                    }}
                  >
                    <Button onClick={onClose} style={{ marginRight: 8 }}>
                      Cancelar
                    </Button>
                  </div>
                }
              >
                <Form
                  layout="vertical"
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                >
                  <Row gutter={24}>
                    <Col span={24}>
                      <Form.Item
                        name="name"
                        label="Nome Completo"
                        initialValue={state && state.name ? state.name : ""}
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira um nome.",
                          },
                        ]}
                      >
                        <Input placeholder="Insira o nome completo." />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="stateDocument"
                        label="RG"
                        initialValue={
                          state && state.stateDocument
                            ? state.stateDocument
                            : ""
                        }
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira um RG.",
                          },
                        ]}
                      >
                        <Input placeholder="Insira o número do RG." />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="federalDocument"
                        label="CPF"
                        initialValue={
                          state && state.federalDocument
                            ? state.federalDocument
                            : ""
                        }
                      >
                        <Input placeholder="Insira o número do CPF." />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="gender"
                        label="Genero"
                        initialValue={state && state.gender ? state.gender : ""}
                        rules={[
                          { required: true, message: "Selecione o genero." },
                        ]}
                      >
                        <Select placeholder="Por favor selecione um genero.">
                          <Option value="male">Masculino</Option>
                          <Option value="female">Feminino</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="telephone"
                        label="Telefone/Celular"
                        initialValue={
                          state && state.telephone ? state.telephone : ""
                        }
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira um número.",
                          },
                        ]}
                      >
                        <Input placeholder="Insira um número válido." />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="birthDate"
                        label="Data de Nascimento"
                        initialValue={
                          state && state.birthDate
                            ? state.birthDate.substring(0, 10)
                            : ""
                        }
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira uma data de nascimento",
                          },
                        ]}
                      >
                        <Input placeholder="Insira uma data de nascimento válida." />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="streetName"
                        label="Rua e Número"
                        initialValue={
                          state && state.streetName ? state.streetName : ""
                        }
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira uma rua válida.",
                          },
                        ]}
                      >
                        <Input placeholder="Insira uma rua com número da casa." />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="cityName"
                        label="Cidade"
                        initialValue={
                          state && state.cityName ? state.cityName : ""
                        }
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira uma cidade válida.",
                          },
                        ]}
                      >
                        <Input placeholder="Insira uma cidade." />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="stateName"
                        label="Estado"
                        initialValue={
                          state && state.stateName ? state.stateName : ""
                        }
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira um estado válido.",
                          },
                        ]}
                      >
                        <Input placeholder="Insira o nome do estado." />
                      </Form.Item>
                      <Form.Item>
                        <Button type="primary" htmlType="submit">
                          Enviar
                        </Button>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </Drawer>
            </Col>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default UpdatePage;
