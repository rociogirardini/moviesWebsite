import React, { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

//IMPORTS BOOTSTRAP
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function List(props) {
  let token = sessionStorage.getItem("token");

  const [moviesList, setMoviesList] = useState([]);

  useEffect(() => {
    const endPoint =
      "https://api.themoviedb.org/3/discover/movie?api_key=03c7ccfb8d2ce063eb5bfe9703f7f583&language=en-EN&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate";
    axios
      .get(endPoint)
      .then((resp) => {
        const apiData = resp.data.results;
        setMoviesList(apiData);
      })
      .catch((error) => {
        console.log(error);
        Swal.fire(
          "There was a problem",
          "The website is experiencing an error. Please try again later.",
          "error"
        );
      });
  }, [setMoviesList]);

  return (
    <>
      {!token && <Navigate to="/" />}
      <div className="container ListBox my-2">
        <Row xs={1} s={2} md={4} lg={5} className="g-4 mt-5">
          {moviesList.map((movie, idx) => {
            return (
              <Col key={idx}>
                <Card className="m-2">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                    variant="top"
                    alt="movieScreen"
                    className="ListImg"
                  />
                  <button
                    className="favorite-btn"
                    onClick={props.addOrRemoveFromFavs}
                    data-movie-id={movie.id}
                  >
                    🤍​
                  </button>
                  <Card.Body>
                    <Card.Title>{movie.title.substring(0, 17)}{movie.title.length > 17 && "..."}</Card.Title>
                    <Card.Text>{movie.overview.substring(0, 0)}</Card.Text>
                    <Link
                      to={`/detail?movieID=${movie.id}`}
                      className="btnCard"
                    >
                      VIEW DETAIL
                    </Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </div>
    </>
  );
}

export default List;
