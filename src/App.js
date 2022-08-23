// Libraries
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Login from "./components/Login";
import List from "./components/List";
import Detail from "./components/Detail";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Results from "./components/Results";
import Favorites from "./components/Favorites";

// Style
import "./css/App.css";

function App() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const favsInLocal = localStorage.getItem("favs");
    if (favsInLocal !== null) {
      const favsArray = JSON.parse(favsInLocal);
      setFavorites(favsArray);
    }
  }, []);
  const addOrRemoveFromFavs = (e) => {
    const favMovies = localStorage.getItem("favs");
    let tempMoviesInFavs;
    if (favMovies === null) {
      tempMoviesInFavs = [];
    } else {
      tempMoviesInFavs = JSON.parse(favMovies);
    }
    const btn = e.currentTarget;
    const parent = btn.parentElement;
    const imgURL = parent.querySelector("img").getAttribute("src");
    const title = parent.querySelector("div.card-title").innerText;
    const overview = parent.querySelector("p").innerText;
    const movieData = {
      imgURL,
      title,
      overview,
      id: btn.dataset.movieId,
    };
    let movieIsInArray = tempMoviesInFavs.find((oneMovie) => {
      return oneMovie.id === movieData.id;
    });
    if (!movieIsInArray) {
      tempMoviesInFavs.push(movieData);
      localStorage.setItem("favs", JSON.stringify(tempMoviesInFavs));
      setFavorites(tempMoviesInFavs);
    } else {
      let moviesLeft = tempMoviesInFavs.filter((oneMove) => {
        return oneMove.id !== movieData.id;
      });
      localStorage.setItem("favs", JSON.stringify(moviesLeft));
      setFavorites(moviesLeft);
    }
  };
  return (
    <>
      <Header favorites={favorites}/>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/list"
          element={<List addOrRemoveFromFavs={addOrRemoveFromFavs} />}
        />
        <Route path="/detail" element={<Detail addOrRemoveFromFavs={addOrRemoveFromFavs}/>} />
        <Route
          path="/results"
          element={<Results addOrRemoveFromFavs={addOrRemoveFromFavs} />}
        />
        <Route
          path="/favorites"
          element={<Favorites addOrRemoveFromFavs={addOrRemoveFromFavs} favorites={favorites} />}
        />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
