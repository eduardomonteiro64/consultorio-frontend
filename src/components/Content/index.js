import React from "react";
import { Layout } from "antd";
import { Switch, Route } from "react-router-dom";

import AppointmentPage from "../AppointmentPage";
import CreatePage from "../CreatePage";
import DeletePage from "../DeletePage";
import LoginPage from "../LoginPage";
import HistoryPage from "../HistoryPage";
import HealthPlansPage from "../HealthPlansPage";
import SearchPage from "../SearchPage";
import UpdatePage from "../UpdatePage";
import PaymentPage from "../PaymentPage";

import { PrivateRoute } from "../../utils/PrivateRoute";

const Content = () => {
  const { Header } = Layout;
  return (
    <div>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        {JSON.parse(localStorage.getItem("user_consultorio")) && (
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <p
              style={{ textAlign: "end", marginRight: 35, cursor: "pointer" }}
              onClick={() => {
                localStorage.setItem("user_consultorio", false);
                window.location.href = "/login";
              }}
            >
              Logout
            </p>
          </div>
        )}
      </Header>
      <Switch>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute path="/search" component={SearchPage} />

        <PrivateRoute path="/create" component={CreatePage} />

        <PrivateRoute path="/update" component={UpdatePage} />

        <PrivateRoute path="/delete" component={DeletePage} />

        <PrivateRoute path="/history" component={HistoryPage} />

        <PrivateRoute path="/health-plans" component={HealthPlansPage} />

        <PrivateRoute path="/payment" component={PaymentPage} />

        <PrivateRoute path="/appointment" component={AppointmentPage} />
      </Switch>
    </div>
  );
};

export default Content;
