import { Navigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProgressBar from "react-bootstrap/ProgressBar";
import addFavs from '../addFavs.png'

//backdrop_path

function Detail(props) {
  let token = sessionStorage.getItem("token");
  let [query] = useSearchParams();
  let movieID = query.get("movieID");

  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=03c7ccfb8d2ce063eb5bfe9703f7f583&language=en-EN`;
    axios
      .get(endPoint)
      .then((resp) => {
        const movieData = resp.data;
        setMovie(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [movieID]);

  return (
    <>
      {!token && <Navigate to="/" />}
      {!movie && <p>Cargando...</p>}
      {movie && (
        <div className="container">
          <Row
            style={{
              color: "#ecf0f1",
            }}
          >
            <h2 className="pageTitle" style={{ fontWeight: "800" }}>
              {movie.title}
            </h2>
            <Col className="d-flex justify-content-center">
              <img
                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                alt="movieScreen"
                className="rounded fluid mb-3 detailImg"
              />
            </Col>
            <Col className="detailBox mb-3">
              <h5 className="detailTitle">Storyline</h5>
              <p className="detailInfo">{movie.overview}</p>
              <h5 className="detailTitle">Release date</h5>
              <p className="detailInfo">
                {movie.release_date.substr(5, [2])}{" "}
                {movie.release_date.substr(8, [2])}th,{" "}
                {movie.release_date.substr(0, [4])}
              </p>
              <h5 className="detailTitle">Vote average</h5>
              <ProgressBar now={Math.trunc(movie.vote_average) * 10} label={`${Math.trunc(movie.vote_average)} / 10`} />
              <button
                  className="btn btnFav mt-2"
                  onClick={props.addOrRemoveFromFavs}
                  data-movie-id={movie.id}
                >
                  <img src={addFavs} className="m-1" width="13px" alt="addFavsBtn" /> ADD TO FAVS
                </button>
            </Col>
          </Row>
        </div>
      )}
    </>
  );
}

export default Detail;
