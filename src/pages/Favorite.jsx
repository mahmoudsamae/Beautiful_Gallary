import React, { useContext, useEffect, useState } from "react";
import { GallaryContext } from "../App";
import Item from "../components/Main/Item";
import { Button, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";

function Favorite({ addToFavorite, deleteFromFavorite, setType, type }) {
  const photo =
    localStorage.getItem("favPhoto") &&
    JSON.parse(localStorage.getItem("favPhoto"));
  const video =
    localStorage.getItem("favVideo") &&
    JSON.parse(localStorage.getItem("favVideo"));

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Button
          onClick={() => setType("photo")}
          variant={type === "photo" ? "contained" : "outlined"}
        >
          Photo
        </Button>
        <Button
          onClick={() => setType("video")}
          variant={type === "video" ? "contained" : "outlined"}
        >
          Video
        </Button>
      </Stack>
      {type === "video" ? (
        <>
          {video?.length <= 0 ? (
            <NoItemFound text={"video"} />
          ) : (
            <Item
              data={video}
              type={type}
              addToFavorite={addToFavorite}
              deleteFromFavorite={deleteFromFavorite}
            />
          )}
        </>
      ) : (
        <>
          {photo?.length <= 0 ? (
            <NoItemFound text={"Photo"} />
          ) : (
            <Item
              data={photo}
              type={type}
              addToFavorite={addToFavorite}
              deleteFromFavorite={deleteFromFavorite}
            />
          )}
        </>
      )}
    </>
  );
}

const NoItemFound = ({ text }) => {
  return (
    <Stack
      sx={{ height: "100%" }}
      justifyContent={"center"}
      alignItems={"center"}
      gap={2}
      mt={10}
    >
      <Typography>There is No Favorite {text} Yet</Typography>
      <Button variant="outlined">
        <Link to={"/"} style={{ textDecoration: "none", color: "#FFF" }}>
          Select {text}
        </Link>
      </Button>
    </Stack>
  );
};

export default Favorite;
