import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

function Restaurant() {
  const [location, setLocation] = useState("-33.8670522,151.1957362");
  const [restaurant, setRestaurant] = useState([]);
  const [apiResponse, setAPIResponse] = useState(null);
  const apiKey = "AIzaSyDF60e9whdj82vQ_qSkLEdSv73KI-y92sM";
  const radius = "100";

  const url =
    "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
    location +
    "&radius=" +
    radius +
    "&type=restaurant&key=" +
    apiKey;

  const makeAPICall = async () => {
    console.log(url);

    await fetch(url, {
      mode: 'no-cors',
      method: "GET",
      headers:{
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials':true,
        'Access-Control-Allow-Methods':'POST, GET',
        'Content-Type': 'application/json'
      }
    }).then((data) => {
      console.log(data);
        setRestaurant(data.results);
        setAPIResponse(data.status);
      });
  };

  useEffect(() => {
    makeAPICall();
  }, [location]);

  return <div>{restaurant} : {apiResponse}</div>;
}

export default Restaurant;
