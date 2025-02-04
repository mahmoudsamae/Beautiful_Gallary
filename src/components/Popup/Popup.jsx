import { IconButton, Stack, Typography } from "@mui/material";
import React, { useContext } from "react";
import classes from "./popup.module.css";
import { GallaryContext } from "../../App";
import { Close, Delete } from "@mui/icons-material";
function Popup({isPopup, setIsPopup}) {
  const data = useContext(GallaryContext);
  const items = data?.filter(ele => ele.id === isPopup.id);
  const selectedItem = items[0];

  const closeItem = () => {
    setIsPopup({id: '', isPopup: false})
  }
  return (
    <>
      {
        isPopup.isPopup && (
          <Stack className={classes.container}>
            <Stack gap={2} className={classes.content} sx={{flexDirection: {xs: 'column', sm: 'row'}}}>
              <IconButton onClick={() => closeItem()} className={classes.icon}>
                <Close />
              </IconButton>
              <Stack className={classes.imageBox}>
                <img className={classes.image} src={selectedItem?.src?.original} alt={selectedItem?.alt} />
              </Stack>
              <Stack className={classes.info}>
                  <Typography>photographer : {selectedItem?.photographer}</Typography>
                  <Typography>width : {selectedItem?.width}px</Typography>
                  <Typography>height : {selectedItem?.height}px</Typography>
                  <Typography>Liked : {selectedItem?.liked ? 'Yes' : 'No'}</Typography>
                  <Typography fontWeight={400}>alt : {selectedItem?.alt}</Typography>
              </Stack>
            </Stack>
          </Stack>
        )
      }
    </>
  );
}

export default Popup;
