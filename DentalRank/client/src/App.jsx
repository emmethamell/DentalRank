import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import { AppRoutes } from "./AppRoutes";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";

function App() {
  return (
    <Provider store={store}>
      <div>
          <Router>
            <div className="header">
              <Header />
            </div>
            <AppRoutes />
          </Router>
      </div>
    </Provider>
  );
}

export default App;
