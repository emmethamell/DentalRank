import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from "./components/header/Header"
import Home from "./components/home/Home"
import Rank from "./components/rank/Rank"
import { AppRoutes } from './AppRoutes';
import { BrowserRouter as Router } from 'react-router-dom';
import MetricsProvider from './components/rank/MetricsProvider';

function App() {

  return (
    <div>
      <MetricsProvider>
        <Router>
          <Header />
          <AppRoutes />
        </Router>
      </MetricsProvider>
    </div>
  )
}

export default App
