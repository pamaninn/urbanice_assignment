import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import React, { Component } from "react";
import Footer from "./components/Footer";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./pages/Restaurant";

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
      <Routes>
          <Route path="restaurant" element={<Restaurant />} />
      </Routes>
    </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
