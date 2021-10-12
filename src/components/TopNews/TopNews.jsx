import React from "react";
import { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import TopStory from "./TopStory";
import Box from "@mui/material/Box";

function TopNews() {
  const [topNews, setTopNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("science");
  const [status, setStatus] = useState("idle");
  const [loading, setLoading] = useState(false);

  const url = `https://api.nytimes.com/svc/topstories/v2/${searchTerm}.json?api-key=iKFfQs98tkimPA1XA97RRIn0kT1XJwa5`;

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.currentTarget.value);
    setSearchTerm(event.currentTarget.value);
  };

  useEffect(() => {
    const fetchData = async () => {
      console.log(status);
      setStatus("pending");
      setLoading(true);
      try {
        const res = await fetch(url);
        const data = await res.json();
        setStatus("resolved");
        setTopNews(data.results);
        setLoading(false);
      } catch (error) {
        setStatus("error");
      }
    };

    fetchData();
  }, [searchTerm]);

  //console.log(topNews);

  return (
    <>
      <div>
        <Box textAlign="center">
          <Button
            onClick={handleSubmit}
            value={"world"}
            variant="outlined"
            color="primary"
          >
            World News
          </Button>
          <Button
            onClick={handleSubmit}
            value={"technology"}
            variant="outlined"
            color="primary"
          >
            Technology
          </Button>
          <Button
            onClick={handleSubmit}
            value={"us"}
            variant="outlined"
            color="primary"
          >
            US News
          </Button>
        </Box>
      </div>
      <TopStory loading={loading} article={topNews} />
    </>
  );
}
export default TopNews;
