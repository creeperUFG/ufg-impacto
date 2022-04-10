import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";

import Projects from "./pages/Projects";

export default function Routes() {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Projects} />
        <Route path="/Projects" exact component={Projects} />
      </Switch>
    </BrowserRouter>
  );
}
