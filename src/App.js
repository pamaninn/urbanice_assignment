import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import React, { Component } from "react";
import Footer from "./components/Footer";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import { Container } from "@mui/material";

function App() {
  return (
    <div className="App">
      <Header />
      <Container >
        <BrowserRouter>
          <Routes>
            <Route path="restaurant" element={<Restaurant />} />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
