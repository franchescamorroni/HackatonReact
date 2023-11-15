/* eslint-disable no-unused-vars */
import React from "react";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Container } from 'react-bootstrap';
import "./index.css";



function App() {
  return (
      <>
        <Header>

        </Header>

        <main>
        < Home/>
        </main>

     <Footer>

     </Footer>
    </>
  );
}

export default App;
