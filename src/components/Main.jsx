import React from "react";
import { Route, Switch } from "react-router-dom";
import About from "./About/About";
import Articles from "./Articles/Articles";
import TopNews from "./TopNews/TopNews";
import RouteMap from "./RouteMap/RouteMap";

function Main() {
  return (
    <main>
      <Switch>
        <Route path="/About" component={About} />
        <Route path="/Articles" component={Articles} />
        <Route path="/TopNews" component={TopNews} />
        <Route path="/RouteMap" component={RouteMap} />
      </Switch>
    </main>
  );
}

export default Main;
