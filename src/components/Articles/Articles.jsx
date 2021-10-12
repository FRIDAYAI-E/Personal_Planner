import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Article from "./Article";
import SearchBar from "../Searchbar/SearchBar";

function Articles() {
  //console.log(props.articles);

  const [newArticle, setNewArticle] = useState([]);
  const [status, setStatus] = useState("idle");
  const [text, setText] = useState("");
  const [searchTerm, setSearchTerm] = useState("Health");
  const [loading, setLoading] = useState(false);

  const NYT_API = process.env.REACT_APP_NYT_KEY;
  //console.log(NYT_API);

  const searchArticles = `https://api.nytimes.com/svc/search/v2/articlesearch.json?fq=section_name:(${searchTerm})&sort=newest&api-key=${NYT_API}`;
  //console.log(searchArticles);

  useEffect(() => {
    const fetchData = async () => {
      setStatus("pending");
      console.log(status);
      setLoading(true);
      try {
        const res = await fetch(searchArticles);
        const data = await res.json();
        setStatus("resolved");
        setNewArticle(data.response.docs);
        setLoading(false);
      } catch (error) {
        setStatus("error");
      }
    };

    fetchData();
  }, [searchTerm]);

  //console.log(newArticle);

  const cards = newArticle;

  const handleChange = (event) => {
    setText(event.target.value);
    console.log(text);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchTerm(text);
    console.log(searchTerm);
  };

  return (
    <>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          {/* Recent Orders */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <SearchBar
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                text={text}
              />
            </Paper>
          </Grid>
        </Grid>
      </Container>

      <Typography
        component="h1"
        variant="h6"
        color="primary"
        gutterBottom
        align="center"
      >
        {`${searchTerm}`} Section
      </Typography>
      <Container sx={{ py: 8 }} maxWidth="xl">
        <Article loading={loading} article={cards} />
      </Container>
    </>
  );
}

export default Articles;
