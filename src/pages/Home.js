import * as React from "react";
import { styled } from "@mui/material/styles";
import { Box, Chip, IconButton, Paper, Typography } from "@mui/material";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import RestaurantSharp from "@mui/icons-material/RestaurantSharp";
import PinSharp from "@mui/icons-material/PinSharp";
import { Container } from "@mui/system";

//Item style
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  return (
    <Grid container spacing={1} columns={1} sx={{ marginTop: 0 }}>
      {itemData.map((item, index) => (
        <Grid item key={index} xs={1}>
          {/* <Item>  */}
          <Link to={item.url}>
            {" "}
            <Chip
              sx={{
                "& .MuiChip-icon": {
                  color: "#fff",
                },
                backgroundColor: "#d52f2f",
                color: "#fff",
                justifyItems: "center",
              }}
              icon={
                item.title === "Restaurant" ? <RestaurantSharp /> : <PinSharp />
              }
              label={item.title}
            />
          </Link>
          {/* </Item>  */}
        </Grid>
      ))}
    </Grid>
  );
}

const itemData = [
  {
    img: "https://images.unsplash.com/photo-1551963831-b3b1ca40c98e",
    title: "Restaurant",
    url: "/restaurant",
  },
  {
    img: "https://images.unsplash.com/photo-1551782450-a2132b4ba21d",
    title: "Find XYZ",
    url: "/findPuzzleNumber",
  },
];
