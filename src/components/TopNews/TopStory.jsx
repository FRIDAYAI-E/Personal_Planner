import React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

function TopStory(props) {
  console.log(props.article);
  return (
    <>
      {props.loading ? (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
        </Box>
      ) : (
        <Grid container spacing={4}>
          {props.article.map((element, index) => (
            <Grid item key={index} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  src={
                    element.multimedia?.[0]?.url
                      ? element.multimedia?.[0].url
                      : "https://upload.wikimedia.org/wikipedia/commons/4/40/New_York_Times_logo_variation.jpg"
                  }
                  alt="news-img"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {element.title}
                  </Typography>
                  <Typography>{element.abstract}</Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => {
                      window.open(element.short_url);
                    }}
                  >
                    View
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </>
  );
}

export default TopStory;
