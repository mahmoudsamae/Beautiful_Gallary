import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import classes from "./hero.module.css";
function Hero({ setQuery }) {
  const [subject, setSubject] = useState("");
  const onSearch = () => {
    if (subject) {
      setQuery(subject);
    }
  };
  return (
    <Stack className={classes.container}>
      <Stack sx={{ textAlign: "center" }}>
        <Typography className={classes.firstText}>
          Discover Beautiful Images Easily
        </Typography>
        <Typography className={classes.secondText}>
          Search and find the perfect images for your Projects.
        </Typography>
      </Stack>
      <Stack
        className={classes.form}
        gap={2}
        sx={{ flexDirection: { xs: "column", sm: "row" } }}
      >
        <input
          variant="outlined"
          sx={{
            width: "250px !important",
            color: "#FFF !important",
            boxShadow: "0 0 10px rgba(255, 255, 255, 100%)",
            borderRadius: 5,
          }}
          className={classes.input}
          onChange={(e) => setSubject(e.target.value)}
          value={subject}
        />
        <Button
          className={classes.btn}
          onClick={() => onSearch()}
          variant="contained"
        >
          Search
        </Button>
      </Stack>
    </Stack>
  );
}

export default Hero;
