import React, { useState, useEffect } from "react";
import * as ReactDOM from "react-dom";

function Restaurant() {
  const [location, setLocation] = useState("-33.8670522,151.1957362");
  const [restaurant, setRestaurant] = useState([]);
  const [apiResponse, setAPIResponse] = useState(null);
  const [address, setAddress] = useState("บางซื่อ");
  const apiKey = "AIzaSyCIaAnRX6RU5Ko29T2ukeXbNjlXTyot-ys";
  const radius = "100";

  const makeAPICall = async () => {
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      location +
      "&radius=" +
      radius +
      "&type=restaurant&key=" +
      apiKey;
    console.log(url);

    await fetch(url, {     
      method: "GET"
      // headers: {
      //   "Access-Control-Allow-Origin": "*",
      //   "Access-Control-Allow-Credentials": true,
      //   "Access-Control-Allow-Methods": "POST, GET",
      //   "Content-Type": "application/json",
      // },
    })
      .then((response) => {
       console.log(response);
      })
      .then((data) => {
        console.log(data);
        setRestaurant(data.results);
        setAPIResponse(data.status);
      });
  };

  const getCoordinates = () => {
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        const latitude = data.results[0].geometry.location.lat;
        const longitude = data.results[0].geometry.location.lng;
        console.log({ latitude, longitude });
        setLocation(latitude + "," + longitude);
      });
  };

  useEffect(() => {
    makeAPICall();
    getCoordinates();
  }, [location]);

  return (
    <div>
      {restaurant} : {apiResponse}
    </div>
  );
}

export default Restaurant;
