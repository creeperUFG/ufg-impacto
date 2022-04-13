import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Menu from "./components/Menu";

import Projects from "./pages/Projects";
import SearchProjects from "./pages/SearchProjects";

export default function Routes() {
  return (
    <BrowserRouter>
      <Menu />
      <Switch>
        <Route path="/" exact component={Projects} />
        <Route path="/projects" exact component={Projects} />
        <Route path="/projects/search" exact component={SearchProjects} />
      </Switch>
    </BrowserRouter>
  );
}
