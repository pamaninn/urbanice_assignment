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
import FindPuzzleNumber from "./pages/FindPuzzleNumber";
import Home from "./pages/Home";

function App() {
  //Search value
  const [searchValue, setTextSearch] = useState("Bang sue");  

  //On change search bar
  const changeState = (e) => {
    const value = e.target.value;
    //Set search alue
    setTextSearch(value);
  };

  return (
    <div className="App"> 
      
          <SearchAppBar changeState={changeState} searchValue={searchValue}/>
          <Container sx={{minHeight:500}}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="restaurant"
                  element={
                    <Restaurant
                      searchAddress={searchValue}                      
                    />
                  }
                />
                <Route path="findPuzzleNumber" element={<FindPuzzleNumber />} />
              </Routes>
            </BrowserRouter>
          </Container>
          <Footer />
        </div>
      
  );
}

export default App;
