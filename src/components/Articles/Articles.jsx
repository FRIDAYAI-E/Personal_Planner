import * as React from "react";
import { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

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
      <Grid container>
        <SearchBar
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          text={text}
        />
      </Grid>
      <Container sx={{ py: 8 }} maxWidth="xl">
        <Article loading={loading} article={cards} />
      </Container>
    </>
  );
}

export default Articles;
