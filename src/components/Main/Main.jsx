import React, { useContext } from "react";
import Hero from "../Hero/Hero";
import Item from "./Item";
import { GallaryContext } from "../../App";
import { Button, Stack } from "@mui/material";

function Main({ addToFavorite, deleteFromFavorite, setQuery, type, setType }) {
  const data = useContext(GallaryContext);

  return (
    <>
      <Hero setQuery={setQuery} />
      <Stack direction={'row'} mt={3} gap={2} justifyContent={'center'} alignItems={'center'}>
        <Button onClick={() => setType('photo')} variant={type === 'photo' ? 'contained' : 'outlined'}>Photo</Button>
        <Button onClick={() => setType('video')} variant={type === 'video' ? 'contained' : 'outlined'}>Video</Button>
      </Stack>
      <Item data={data} type={type} addToFavorite={addToFavorite} deleteFromFavorite={deleteFromFavorite}/>
    </>
  );
}

export default Main;
