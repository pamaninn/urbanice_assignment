import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import React, { Component, useState, useEffect } from "react";
import Footer from "./components/Footer";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Restaurant from "./pages/Restaurant";
import { Container } from "@mui/material";
import SearchAppBar from "./components/HeaderBar";

function App() {
  const [searchValue, setTextSearch] = useState("Bang sue");
  const changeState = (e) => {
    const value = e.target.value;

    setTextSearch(value);
  };

  return (
    <div className="App">
      {/* <Header /> */}
      <SearchAppBar changeState={changeState} searchValue={searchValue} />
      <Container>
        <BrowserRouter>
          <Routes>
            <Route
              path="restaurant"
              element={<Restaurant searchAddress={searchValue} />}
            />
          </Routes>
        </BrowserRouter>
      </Container>
      <Footer />
    </div>
  );
}

export default App;
