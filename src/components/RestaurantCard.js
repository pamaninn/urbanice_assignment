import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Chip, IconButton, Paper } from "@mui/material";
import { textAlign } from "@mui/system";
import { styled } from "@mui/material/styles";
import StarSharp from "@mui/icons-material/StarSharp";
import { yellow } from "@mui/material/colors";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function RestaurantCard(props) {
  //console.log(props);
  const { item, apiKey, index } = props;
  const hasPhotos = item.photos === undefined;
  const photoRef = hasPhotos ? "" : item.photos[0].photo_reference;
  const photoApi = hasPhotos
    ? ""
    : "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photo_reference=" +
      photoRef +
      "&key=" +
      apiKey;

  return (
    <Grid item key={index}>
      {/* <Item> */}
      <Card sx={{ maxWidth: 250, height: 320, m: 0, p: 0 }}>
        <CardMedia
          component="img"
          height="140"
          image={hasPhotos ? item.icon : photoApi}
          //alt="green iguana"
        />
        <CardContent sx={{height:100}}>         
          <Typography gutterBottom variant="h7" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{display:'inline',maxHeight:'40px'}}>
            {item.vicinity}
          </Typography>
        </CardContent>
        {/* <CardActions> */}
        {item.rating && <Chip
            sx={{
              "& .MuiChip-icon": {
                color: "#fff",
              },
              backgroundColor: "#d52f2f",
              color: "#fff",
              justifyItems:'center'
            }}
            icon={<StarSharp />}
            label={item.rating+' | '+ item.user_ratings_total +' reviews'}
          />}
         
        {/* </CardActions> */}
      </Card>
      {/* </Item> */}
    </Grid>
  );
}
