import { createContext, useEffect, useState } from "react";
import Header from "./components/Header/Header";
import { Container, Typography } from "@mui/material";
import Main from "./components/Main/Main";
import { Route, Routes } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Popup from "./components/Popup/Popup";

export const GallaryContext = createContext();
export const PopupContext = createContext();
const KYE = "NprqzZMeumiT6KPhnInUfKPv8eSxCVK6dXcywtKwRhUNdLf4e2D7xarZ";

function App() {
  const [query, setQuery] = useState("people");
  const [photos, setPhotos] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState("");
  const [isPopup, setIsPopup] = useState({ id: "", isPopup: false });
  const [type, setType] = useState("photo");

  const getData = async () => {
    setIsError(false);
    setIsLoading(true);
    if (type === "photo") {
      await fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
          Authorization: KYE,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setPhotos(data.photos);
        })
        .catch((error) => {
          setIsError(true);
          setError(error);
        });
    } else if (type === "video") {
      await fetch(`https://api.pexels.com/videos/search?query=${query}`, {
        headers: {
          Authorization: KYE,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const allData = data?.videos?.map((ele) => {
            return { ...ele, liked: false };
          });
          setVideos(allData);
        })
        .catch((error) => {
          setIsError(true);
          setError(error);
        });
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getData();
  }, [query, type]);

  useEffect(() => {
    if (window.localStorage.getItem("favPhoto") === null) {
      window.localStorage.setItem("favPhoto", []);
    }
    if (window.localStorage.getItem("favVideo") === null) {
      window.localStorage.setItem("favVideo", []);
    }
  }, []);

  const addToFavorite = (index, favType) => {
    if (favType === "photo") {
      const editLike = [...photos];
      editLike[index].liked = true;
      setPhotos(editLike);
      
      let photoUrls =
        localStorage.getItem("favPhoto") === null ||
        localStorage.getItem("favPhoto") === ""
          ? []
          : JSON.parse([localStorage.getItem("favPhoto")]);
      photoUrls.push(editLike[index]);
      window.localStorage.setItem("favPhoto", JSON.stringify(photoUrls));
    } else {
      const editLike = [...videos];
      editLike[index].liked = true;
      setVideos(editLike);
      let photoUrls =
        localStorage.getItem("favVideo") === null ||
        localStorage.getItem("favVideo") === ""
          ? []
          : JSON.parse([localStorage.getItem("favVideo")]);
      photoUrls.push(editLike[index]);
      window.localStorage.setItem("favVideo", JSON.stringify(photoUrls));
    }
  };

  const deleteFromFavorite = (index, favType) => {
    if (favType === "photo") {
      const editLike = [...photos];
      editLike[index].liked = false;
      setPhotos(editLike);
      let photoUrls = JSON.parse(localStorage?.getItem('favPhoto'));
      let photoFav = photoUrls.filter(ele => ele?.id !== editLike[index]?.id);
      localStorage.setItem('favPhoto', JSON.stringify(photoFav));
      if(photoUrls?.length <= 1){
        localStorage.setItem('favPhoto', [])
      }
    } else {
      const editLike = [...videos];
      editLike[index].liked = true;
      setVideos(editLike);
      let videoUrls = JSON.parse(localStorage?.getItem('favVideo'));
      let videoFav = videoUrls.filter(ele => ele?.id !== editLike[index]?.id);
      localStorage.setItem('favVideo', JSON.stringify(videoFav));
      if(videoUrls?.length <= 1){
        localStorage.setItem('favVideo', [])
      }
    }
  };

  return (
    <Container sx={{ bgcolor: "#000", minHeight: "100vh" }}>
      <Header />
      {isLoading ? (
        <Typography textAlign={"center"}>Loading... please wait</Typography>
      ) : isError ? (
        <Typography textAlign={"center"}>{error}</Typography>
      ) : (
        <>
          <GallaryContext.Provider value={type === "photo" ? photos : videos}>
            <PopupContext.Provider value={setIsPopup}>
              <Popup isPopup={isPopup} setIsPopup={setIsPopup} />
              <Routes>
                <Route
                  path="*"
                  element={
                    <Main
                      type={type}
                      setType={setType}
                      setQuery={setQuery}
                      addToFavorite={addToFavorite}
                      deleteFromFavorite={deleteFromFavorite}
                    />
                  }
                />
                <Route
                  path="/"
                  element={
                    <Main
                      type={type}
                      setType={setType}
                      setQuery={setQuery}
                      addToFavorite={addToFavorite}
                      deleteFromFavorite={deleteFromFavorite}
                    />
                  }
                />
                <Route
                  path="/favorite"
                  element={
                    <Favorite
                      type={type}
                      setType={setType}
                      addToFavorite={addToFavorite}
                      deleteFromFavorite={deleteFromFavorite}
                    />
                  }
                />
              </Routes>
            </PopupContext.Provider>
          </GallaryContext.Provider>
        </>
      )}
    </Container>
  );
}

export default App;
