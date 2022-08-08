import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";

function Restaurant() {
  const [location, setLocation] = useState("-33.8670522,151.1957362");
  const [restaurant, setRestaurant] = useState([]);
  const [apiResponse, setAPIResponse] = useState(null);
  const [address, setAddress] = useState("บางซื่อ");
  const apiKey = "AIzaSyCIaAnRX6RU5Ko29T2ukeXbNjlXTyot-ys";
  const radius = "500";

  //get restaurant with google api
  const getRestaurant = async () => {
    const url =
      "https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=" +
      location +
      "&radius=" +
      radius +
      "&type=restaurant&key=" +
      apiKey;
    
    //CALL POST METHOD from localhost:5000 server
    axios
      .post("http://localhost:5000/googleapi", { path: url })
      .then((res) => {
        setRestaurant(res.data);
        console.log(res.data);
      })
      .catch((error) => console.log("error", error));
  };

  //get latitude and longtitude location
  const getLocations = () => {
    
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
        //set value to location
        setLocation(latitude + "," + longitude);
      });
  };

  useEffect(() => {
    getRestaurant();
    getLocations();
  }, [location]);

  return (
    
      <Box sx={{flexGrow:1,mt:2}} >
      <Grid container spacing={{xs:1}} columns={{xs:4,sm:8,md:12}} sx={{marginTop:0}}>
      {restaurant.map((item,index) => (
        
        <RestaurantCard item={item} apiKey={apiKey} index={index}/>
      
      ))
      }
      </Grid>
   
    </Box>
   
  );
}

export default Restaurant;
