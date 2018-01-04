import React from "react";
import { render } from "react-dom";

//import App from "./components/App";                                   // REACT APP
//import AppWithRouter from "./components/AppWithRouter";               // REACT APP WITH ROUTER
import AppWithRouterRedux from "./components/AppWithRouterRedux";       // REACT APP WITH ROUTER & REDUX
import "./styles/default.css";

render(<AppWithRouterRedux />, document.getElementById("root"));
