import { Form, Input, Button, Layout, Row, Col, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import React from "react";

const LoginPage = () => {
  const [loginSuccess, setLoginSuccess] = React.useState(false);

  const { Content } = Layout;
  const { Title } = Typography;
  const isLogged = JSON.parse(localStorage.getItem("user_consultorio"));
  const onFinish = (values) => {
    const { password, username } = values;

    if (username === "admin" && password === "admin") {
      localStorage.setItem("user_consultorio", true);
      return setLoginSuccess(true);
    } else {
      alert("Usuário ou senha incorreto!");
    }
  };

  React.useEffect(() => {
    if (isLogged || loginSuccess) {
      setTimeout(() => {
        return (window.location.href = "/search");
      }, [500]);
    }
  }, [isLogged, loginSuccess]);

  const handleClick = () => {
    console.warn("aqui");
    const templateParams = {
      login: "admin",
      password: "admin",
    };
    window.emailjs
      .send("service_wzc189c", "template_368z9hl", templateParams)
      .then(
        function (response) {
          console.log("SUCCESS!", response.status, response.text);
          alert("Email de lembrança de usuário/senha enviado com sucesso!");
          window.location.reload();
        },
        function (error) {
          console.log("FAILED...", error);
          alert(
            "Email de lembrança de usuário/senha não enviado. Erro:",
            error
          );
        }
      );
  };

  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 360, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Página de Login</Title>
            <Col sm={6} xs={6} align="middle">
              <Form
                name="normal_login"
                className="login-form"
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira o usuário!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined className="site-form-item-icon" />}
                    placeholder="Usuário"
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Por favor insira a senha!",
                    },
                  ]}
                >
                  <Input
                    prefix={<LockOutlined className="site-form-item-icon" />}
                    type="password"
                    placeholder="Senha"
                  />
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="login-form-button"
                  >
                    Log in
                  </Button>
                </Form.Item>

                <Form.Item>
                  <Button onClick={() => handleClick()}>
                    Esqueceu a senha? Clique aqui
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

export default LoginPage;
