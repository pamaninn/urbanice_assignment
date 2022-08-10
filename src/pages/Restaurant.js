import React, { useState, useEffect } from "react";
import axios from "axios";
import RestaurantCard from "../components/RestaurantCard";
import Grid from "@mui/material/Grid";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import Loader from "../components/Loader";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import { styled, alpha } from "@mui/material/styles";

//Style of search box
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#c4cbcd59' ,
  "&:hover": {
    backgroundColor: '#c4cbcd59' ,
  },
  marginLeft: 0,
  width: "100%",
  marginBottom:5,
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "50%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

function Restaurant(props) {
  //const { searchAddress } = props;
  const [location, setLocation] = useState("");
  const [restaurant, setRestaurant] = useState([]);
  const [address, setAddress] = useState("Bang sue");
  const [zeroResult, setZeroResult] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const apiKey = "AIzaSyCIaAnRX6RU5Ko29T2ukeXbNjlXTyot-ys";
  const radius = "500";
  //const [searchAddress, setTextSearch] = useState("Bang sue");  

  //On change search bar
  const changeState = (e) => {
    const value = e.target.value;
    //Set search alue
    setAddress(value);
  };

  //get latitude and longtitude location
  const getLocations = () => {
    console.log(address);
    fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=" +
        apiKey
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.status === "OK") {
          const latitude = data.results[0].geometry.location.lat;
          const longitude = data.results[0].geometry.location.lng;
          //set value to location
          setLocation(latitude + "," + longitude);
          setZeroResult(false);
        } else  {
          setZeroResult(true);
          setLoading(false);
          
        } //if (data.status === "ZERO_RESULTS")
      });
  };

  //get restaurant with google api
  const getRestaurant = async () => {
    console.log(location);
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
      .catch((error) => {        
        console.log("error", error);
      });
  };

  //1.Set address when props searchAddress from parent has been changed
  // useEffect(() => {
  //   //setAddress(searchAddress);
  //   setLoading(true);
  // }, []);

  //2.Get location from searching keyword address to get latitude ang longtitude for retrive list of resturant , call funciton when address changed
  useEffect(() => {
    getLocations();
    //setLoading(true);
  }, [address]);

  //3.Call get restaurant when location changed
  useEffect(() => {
    getRestaurant();
  }, [location]);

  useEffect(()=>{
  
      setLoading(false);
      
  },[restaurant]);

  return (
    <div>
    {isLoading ? (<Loader /> ):
      (
    <Box sx={{ flexGrow: 1, mt: 2 }}>     
    <Grid
          container
          spacing={{ xs: 1 }}
          columns={{ xs: 1 }}
          sx={{ marginTop: 2 }}
        >
    <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
              onChange={changeState}
              inputtypesearch="true"
              value={address}
            />
          </Search>
          </Grid>
      {zeroResult ? (
        <Typography variant="h1" component="h2">
          No result
        </Typography>
      ) : (
        <Grid
          container
          spacing={{ xs: 1 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          sx={{ marginTop: 2 }}
        >
        
          {restaurant.map((item, index) => (
            <RestaurantCard
              item={item}
              apiKey={apiKey}
              index={index}
              key={index}
            />
          ))}
        </Grid>
      )}
    </Box>
    
    ) }
    </div>
  );
}

export default Restaurant;
