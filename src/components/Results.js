import { useState, useEffect } from "react";
import { Link, Navigate, useSearchParams } from "react-router-dom";
import axios from "axios";

// BOOTSTRAP IMPORTS
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

function Results(props) {
  let token = sessionStorage.getItem("token");

  let [query] = useSearchParams();
  let keyword = query.get("keyword");

  const [moviesResults, setMoviesResults] = useState([]);

  useEffect(() => {
    const endPoint = `https://api.themoviedb.org/3/search/movie?api_key=03c7ccfb8d2ce063eb5bfe9703f7f583&language=en-EN&page=1&include_adult=false&query=${keyword}`;
    axios
      .get(endPoint)
      .then((response) => {
        const moviesArray = response.data.results;
        setMoviesResults(moviesArray);
      })
      .catch((error) => console.log(error));
  });

  return (
    <>
      {!token && <Navigate to="/" />}
      <div
        style={{ minHeight: "75vh", color: "#ecf0f1" }}
        className="container"
      >
        <h2 className="pageTitle m-3">SEARCH RESULTS</h2>
        <p>
          Showing results for "
          <span className="text-capitalize">
            <em>{keyword}</em>
          </span>
          "
        </p>
        {moviesResults.length === 0 && (
          <p style={{ fontWeight: "300" }}>
            No results found. Try another keyword.
          </p>
        )}
        <Row xs={1} s={2} md={4} lg={5} className="g-4 mt-5">
          {moviesResults.map((movie, idx) => {
            return (
              <Col key={idx}>
                <Card className="m-2">
                  <img
                    src={
                      movie.poster_path === null
                        ? "https://reactnative-examples.com/wp-content/uploads/2022/02/default-loading-image.png"
                        : `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                    }
                    variant="top"
                    alt="Card cap"
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
                    <Card.Title>{movie.title}</Card.Title>
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

export default Results;
