import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Input,
  List,
  Button,
  Modal,
  Form,
  Drawer,
} from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import MaskedInput from "antd-mask-input";

const AppointmentPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Search } = Input;

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [state, setState] = React.useState({
    appointments: "",
    userSchedule: "",
  });

  const [visible, setVisible] = React.useState(false);

  const url =
    "https://consultorio-backend0.herokuapp.com/api/userScheduleService";

  const handleClick = (id) => {
    axios.delete(`${url}/${id}`).then((resp) => resp);
    alert("Consulta deletada com sucesso!");
    window.location.reload();
  };

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onFinish = (values) => {
    axios
      .post(url, {
        time: values.time,
        date: values.date,
        name: values.name,
        stateDocument: values.stateDocument,
      })
      .then((resp) => resp);
    alert("Consulta incluida com sucesso!");
    window.location.reload();
  };

  const onFinishFailed = () => {
    alert("Faltam campos a serem preenchidos.");
  };

  const onSearch = (value) => {
    axios.get(`${url}?stateDocument=${value}`).then((response) => {
      setState({ ...state, userSchedule: response.data });
      response.data && response.data.length >= 1
        ? showDrawer()
        : alert("Usuário não possui consultas agendadas.");
    });
  };

  React.useEffect(() => {
    const todayDate = new Date().toISOString().slice(0, 10);
    axios.get(`${url}?date=${todayDate}`).then((response) => {
      setState({ ...state, appointments: response.data });
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
            <Title>Consultas do Dia</Title>
            <Search
              placeholder="Digite o documento do usuário"
              allowClear
              enterButton="Buscar"
              size={window.screen.width < 576 ? "small" : "large"}
              onSearch={onSearch}
              style={{ margin: 20 }}
            />
            <Drawer
              width={640}
              placement="right"
              closable={false}
              onClose={onClose}
              visible={visible}
            >
              {state && state.userSchedule.length >= 1 ? (
                <List
                  bordered
                  dataSource={
                    state && state.userSchedule ? state.userSchedule : ""
                  }
                  renderItem={(item) => (
                    <List.Item>
                      <Typography style={{ padding: 10 }}>
                        Dia da consulta: {item.date.substring(0, 10)}
                      </Typography>{" "}
                      <Typography style={{ padding: 10 }}>
                        Hora da consulta: {item.time}
                      </Typography>{" "}
                      <Typography style={{ padding: 10 }}>
                        <b>Nome do paciente: {item.name}</b>
                      </Typography>{" "}
                      <Typography style={{ padding: 10 }}>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => handleClick(item._id)}
                          type="primary"
                          danger
                        >
                          Deletar Consulta
                        </Button>
                      </Typography>{" "}
                    </List.Item>
                  )}
                />
              ) : (
                ""
              )}
            </Drawer>
            <Col sm={22} xs={24} align="middle">
              {state && state.appointments.length >= 1 ? (
                <List
                  header={
                    <div>
                      <b>Inicio do dia</b>
                    </div>
                  }
                  footer={
                    <div>
                      <b>Fim do dia</b>
                    </div>
                  }
                  bordered
                  dataSource={
                    state && state.appointments ? state.appointments : ""
                  }
                  renderItem={(item) => (
                    <List.Item>
                      <Typography style={{ padding: 10 }}>
                        Hora da consulta: {item.time}
                      </Typography>{" "}
                      <Typography.Text mark style={{ padding: 10 }}>
                        <b>Nome do paciente: {item.name}</b>
                      </Typography.Text>{" "}
                      <Typography style={{ padding: 10 }}>
                        <Button
                          icon={<DeleteOutlined />}
                          onClick={() => handleClick(item._id)}
                          type="primary"
                          danger
                        >
                          Deletar Consulta
                        </Button>
                      </Typography>{" "}
                    </List.Item>
                  )}
                />
              ) : (
                ""
              )}

              <Col align="end" style={{ marginTop: 50 }}>
                <Button type="primary" onClick={showModal}>
                  Adicionar Consulta
                </Button>
                <Modal
                  title="Adicionar Consulta"
                  visible={isModalVisible}
                  onOk={handleOk}
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
                      <Form.Item label="Nome" name="name">
                        <Input />
                      </Form.Item>
                      <Form.Item label="RG" name="stateDocument">
                        <MaskedInput mask="11.111.111-1" />
                      </Form.Item>
                      <Form.Item label="Horário" name="time">
                        <input
                          id="time"
                          type="time"
                          min="09:00"
                          max="18:00"
                          required
                          pattern="[0-9]{2}:[0-9]{2}"
                        ></input>
                      </Form.Item>
                      <Form.Item label="Dia" name="date">
                        <MaskedInput
                          mask="1111-11-11"
                          placeholder="Ano/Mes/Dia"
                        />
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

export default AppointmentPage;
