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
} from "antd";
import axios from "axios";

const HealthPlansPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const [state, setState] = React.useState({ healthPlanData: "" });

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleClick = (data) => {
    axios.delete(`${url}/${data}`).then((resp) => resp);
    alert("Plano deletado com sucesso!");
    window.location.reload();
  };

  const url = "http://localhost:3003/api/healthPlanDataEndpoint";

  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios
      .post(url, {
        name: values.name,
        description: values.description,
      })
      .then((resp) => resp);
    alert("Plano incluido com sucesso!");
    window.location.reload();
    form.resetFields();
  };

  const onFinishFailed = () => {
    alert("Faltam campos a serem preenchidos.");
  };

  React.useEffect(() => {
    axios.get(url).then((response) => {
      setState({ ...state, healthPlanData: response.data });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 720, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Planos de Saúde Aceitos</Title>
            <Col sm={22} xs={24} align="middle">
              {state && state.healthPlanData.length >= 1 ? (
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
                  dataSource={state.healthPlanData}
                  renderItem={(item) => (
                    <List.Item>
                      <Card title={item.name}>{item.description}</Card>
                      <Button
                        type="primary"
                        danger
                        onClick={() => handleClick(item._id)}
                        style={{ margin: 10 }}
                      >
                        Deletar Plano{" "}
                      </Button>
                    </List.Item>
                  )}
                />
              ) : (
                ""
              )}

              <Col align="end" style={{ marginTop: 50 }}>
                <Button type="primary" onClick={showModal}>
                  Adicionar Plano
                </Button>
                <Modal
                  title="Inserir Plano de Saúde"
                  visible={isModalVisible}
                  onCancel={handleCancel}
                  cancelButtonProps={{ style: { display: "none" } }}
                  okButtonProps={{ style: { display: "none" } }}
                >
                  <Col>
                    <Form
                      name="basic"
                      initialValues={{
                        remember: true,
                      }}
                      onFinish={onFinish}
                      onFinishFailed={onFinishFailed}
                    >
                      <Form.Item
                        label="Nome do Plano de Saúde"
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Por favor insira um nome.",
                          },
                        ]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        label="Descrição do Plano de Saúde"
                        name="description"
                      >
                        <Input.TextArea />
                      </Form.Item>
                      <Button type="primary" htmlType="submit">
                        Enviar
                      </Button>
                    </Form>
                  </Col>
                </Modal>
              </Col>
            </Col>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default HealthPlansPage;
