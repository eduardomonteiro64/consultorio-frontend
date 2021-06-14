import React from "react";
import {
  Layout,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  Select,
  DatePicker,
} from "antd";
import axios from "axios";

const CreatePage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Option } = Select;
  const { Search } = Input;

  const [state, setState] = React.useState({
    postalNumber: "",
    healthPlans: [{}],
  });

  // const [sended, setSended] = React.useState(false);

  const url = "http://localhost:3003/api/userDataEndpoint";

  const [form] = Form.useForm();

  const onFinish = (values) => {
    axios
      .post(url, {
        birthDate: values.birthDate,
        cityName: values.cityName,
        districtName: values.districtName,
        federalDocument: values.federalDocument,
        gender: values.gender,
        email: values.email,
        name: values.name,
        healthPlan: values.healthPlan,
        postalNumber: values.postalNumber,
        stateDocument: values.stateDocument,
        stateName: values.stateName,
        streetName: values.streetName,
        telephone: values.telephone,
      })
      .then((resp) => resp);
    alert("Usuário incluido com sucesso!");
    form.resetFields();
  };

  const onFinishFailed = () => {
    alert("Faltam campos a serem preenchidos.");
  };

  const api = axios.create({
    baseURL: "https://viacep.com.br",
  });

  const onSearchPostalNumber = (value) => {
    if (value) {
      setState({ ...state, postalNumber: value });
    }
  };

  React.useEffect(() => {
    axios
      .get("http://localhost:3003/api/healthPlanDataEndpoint")
      .then((response) => {
        setState({ healthPlans: response.data });
      });
  }, []);

  React.useEffect(() => {
    api.get(`/ws/${state.postalNumber}/json/`).then((response) => {
      form.setFieldsValue({
        streetName: response.data.logradouro,
        districtName: response.data.bairro,
        cityName: response.data.localidade,
        stateName: response.data.uf,
      });
    });
  });

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 720, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Formulário de Criação de Usuário</Title>
            <Col sm={24} xs={24} align="middle">
              <Form
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 8,
                }}
                layout="horizontal"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                form={form}
              >
                <Form.Item
                  label="Nome"
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

                <Form.Item label="CPF" name="federalDocument">
                  <Input />
                </Form.Item>

                <Form.Item
                  label="RG"
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
                  name="gender"
                  label="Gênero"
                  rules={[
                    {
                      required: true,
                      message: "Gênero é necessário.",
                    },
                  ]}
                >
                  <Select placeholder="Selecione uma opção" allowClear>
                    <Option value="male">Masculino</Option>
                    <Option value="female">Feminino</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  labelCol={{
                    span: 8,
                  }}
                  wrapperCol={{
                    span: 2,
                  }}
                  name="birthDate"
                  label="Data de Nascimento"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira uma data de nascimento.",
                    },
                  ]}
                >
                  <DatePicker />
                </Form.Item>

                <Form.Item
                  label="Telefone ou Celular"
                  name="telephone"
                  rules={[
                    {
                      required: true,
                      message:
                        "Por favor insira um número de telefone ou celular.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item label="Email" name="email">
                  <Input />
                </Form.Item>

                <Form.Item
                  name="healthPlan"
                  label="Plano de Saúde"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira um Plano de Saúde!",
                    },
                  ]}
                >
                  <Select allowClear showSearch optionFilterProp="children">
                    {state.healthPlans.map((teste) => (
                      <Option value={teste.name}>{teste.name}</Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="CEP"
                  name="postalNumber"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira um CEP.",
                    },
                  ]}
                >
                  <Search
                    placeholder="Insira o CEP para busca"
                    onSearch={onSearchPostalNumber}
                  />
                </Form.Item>

                <Form.Item
                  label="Rua e Número"
                  name="streetName"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira uma rua.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Bairro"
                  name="districtName"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira um bairro.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Cidade"
                  name="cityName"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira uma cidade.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Estado"
                  name="stateName"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira o estado.",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  labelCol={{
                    span: 24,
                  }}
                  wrapperCol={{
                    span: 24,
                  }}
                >
                  <Button type="primary" htmlType="submit">
                    Enviar
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default CreatePage;
