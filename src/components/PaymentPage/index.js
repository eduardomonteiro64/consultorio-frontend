import React from "react";
import {
  Layout,
  Descriptions,
  Row,
  Col,
  Typography,
  Input,
  Form,
  Button,
} from "antd";
import axios from "axios";
import MoneyInput from "antd-money";

const PaymentPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Search } = Input;

  const [state, setState] = React.useState(undefined);

  const url = "http://localhost:3003/api/userDataEndpoint";

  const [form] = Form.useForm();

  const onSearch = (value) => {
    axios
      .get(`${url}/?stateDocument=${value}`)
      .then((resp) => setState(resp.data[0]));
  };

  const onFinish = (values) => {
    console.warn(values);
    const templateParams = {
      name: state.name,
      value: new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(values.valuePayment),
      email: values.emailPayment,
    };
    window.emailjs
      .send("service_wzc189c", "template_vz2m4nt", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email de cobrança enviado com sucesso!");
          window.location.reload();
        },
        function (error) {
          console.log("FAILED...", error);
          alert("Email de cobrança não enviado. Erro:", error);
        }
      );
    form.resetFields();
  };

  const onFinishFailed = () => {
    alert("Faltam campos a serem preenchidos.");
  };

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 720, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Gerar cobrança</Title>
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
                  <Form
                    labelCol={{
                      span: 8,
                    }}
                    wrapperCol={{
                      span: 8,
                    }}
                    name="paymentForm"
                    initialValues={{
                      remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                  >
                    <Form.Item
                      label="Valor da cobrança:"
                      name="valuePayment"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira um valor.",
                        },
                      ]}
                    >
                      <MoneyInput prefix={"R$"} commaSeperator={true} />
                    </Form.Item>
                    <Form.Item
                      label="Email para envio de cobrança:"
                      name="emailPayment"
                      rules={[
                        {
                          required: true,
                          message: "Por favor insira um email.",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      Enviar
                    </Button>
                  </Form>
                </>
              ) : (
                ""
              )}
            </Col>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default PaymentPage;
