import React, { useContext, useEffect } from "react";
import { Button, Stack, Typography } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import classes from "./main.module.css";
import { PopupContext } from "../../App";

function Item({ addToFavorite, deleteFromFavorite, data, type }) {
  const popupControl = useContext(PopupContext);

  const addFav = (index, favType) => {
    addToFavorite(index, favType);
  };

  const deleteFav = (index, favType) => {
    deleteFromFavorite(index, favType);
  };

  const onChoose = (id) => {
    popupControl({ id: id, isPopup: true });
  };
  const downloadImage = async (ele) => {
    const res = await fetch(ele?.src?.original);
    const blod = await res.blob();
    const url = window.URL.createObjectURL(blod);
    const a = document.createElement("a");
    a.href = url;
    a.download = "downloaded-image.png";
    document.body.appendChild(a).click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Stack className={classes.container} direction={"row"} pb={5}>
        {data?.map((ele, index) => (
          <Stack
            key={ele.id}
            className={type === "photo" ? classes.item : classes.video}
          >
            {type === "photo" ? (
              <img
                onClick={() => onChoose(ele.id)}
                className={classes.image}
                src={ele.src.original}
                alt={ele.alt}
              />
            ) : (
              <video
                loop
                onMouseOver={(e) => e.target.play()}
                onMouseOut={(e) => e.target.pause()}
                className={classes.videoItem}
                src={ele?.video_files[0]?.link}
                controls
              />
            )}
            <Typography className={classes.title}>
              {ele.photographer}
            </Typography>
            {type === "photo" && (
              <Button
                onClick={() => downloadImage(ele)}
                sx={{ width: "50%", mx: "auto", mb: 2 }}
                variant="outlined"
              >
                Download
              </Button>
            )}
            <Stack className={classes.favorite}>
              {ele?.liked ? (
                <Favorite onClick={() => deleteFav(index, type)} />
              ) : (
                <FavoriteBorder onClick={() => addFav(index, type)} />
              )}
            </Stack>
          </Stack>
        ))}
      </Stack>
    </>
  );
}

export default Item;
