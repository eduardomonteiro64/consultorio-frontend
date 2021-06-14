import React from "react";
import { Layout, Row, Col, Typography, Input, List, Button } from "antd";

const AppointmentPage = () => {
  const { Content } = Layout;
  const { Title } = Typography;
  const { Search } = Input;

  const onSearch = (value) => console.log(value);

  const data = [
    "10 Horas - Consulta com Paciente 01",
    "11 Horas - Consulta com Paciente 02",
    "12 Horas - Consulta com Paciente 03",
    "13 Horas - Consulta com Paciente 04",
    "14 Horas - Consulta com Paciente 05",
  ];
  return (
    <Content style={{ margin: "0 16px" }}>
      <div
        className="site-layout-background"
        style={{ padding: 24, minHeight: 720, margin: 10 }}
      >
        <Row>
          <Col sm={24} xs={24} align="middle">
            <Title>Consultas</Title>
            <Col sm={22} xs={24} align="middle">
              <Search
                placeholder="Digite o RG do paciente"
                allowClear
                enterButton="Buscar"
                size={window.screen.width < 576 ? "small" : "large"}
                onSearch={onSearch}
                style={{ margin: 20 }}
              />
              {data && data.length > 1 ? (
                <List
                  header={<div>Inicio do dia</div>}
                  footer={<div>Fim do dia</div>}
                  bordered
                  dataSource={data}
                  renderItem={(item) => (
                    <List.Item>
                      <Typography.Text mark>[01/01/2021]</Typography.Text>{" "}
                      {item}
                    </List.Item>
                  )}
                />
              ) : (
                ""
              )}

              <Col align="end" style={{ marginTop: 50 }}>
                <Button type="primary">Adicionar Consulta</Button>
              </Col>
            </Col>
          </Col>
        </Row>
      </div>
    </Content>
  );
};

export default AppointmentPage;
